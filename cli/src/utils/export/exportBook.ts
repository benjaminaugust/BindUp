import type { BookConfig } from "../../types/BookConfig";
import chalk from "chalk";
import { Format } from "../../types/BookTypes";
import exportEpub from "./exportEpub";
import getFonts from "../../book-styles/getFonts";
import markdownToHtml from "../convert/markdownToHtml";
import convertChapters from "../convert/convertChapters";
import getCSS from "../../book-styles/getCSS";
import throwIfPathInvalid from "../throwIfPathInvalid";
import printRed from "../printRed";
import printBlue from "../printBlue";

export default async (
  bookConfig: BookConfig,
  verbose = false
): Promise<PromiseSettledResult<Buffer | void>[] | void> => {
  try {
    const manuscriptPath = bookConfig.manuscript;

    throwIfPathInvalid(manuscriptPath, verbose);

    const chapterArray = convertChapters(manuscriptPath);

    if (bookConfig.css === undefined) bookConfig.css = "";
    try {
      const { cssFile } = bookConfig;
      if (cssFile) {
        throwIfPathInvalid(cssFile, verbose);
        console.log(chalk.blueBright(`Loading CSS File ${cssFile} ...`));
        bookConfig.css += await getCSS(cssFile, verbose);
        bookConfig.css += " ";
      }
    } catch (error) {
      printRed("You specified a CSS File, but it failed to load.", error);
    }

    bookConfig.css += getFonts(bookConfig, verbose);

    const convertedChapters = await markdownToHtml(
      chapterArray,
      manuscriptPath
    );
    return await exportBasedOnFormat(bookConfig, convertedChapters, verbose);
  } catch (err) {
    return printRed("Failed to export ebook.", err);
  }
};

const exportBasedOnFormat = async (
  bookConfig: BookConfig,
  convertedContent: any,
  verbose = false
): Promise<PromiseSettledResult<Buffer | void>[]> => {
  printBlue(`Rendering to the following formats:\n ${bookConfig.formats}`);

  const { formats } = bookConfig;

  if (verbose) printBlue(`Validating your specified formats...`);
  if (!formats)
    throw new Error(
      `No valid file formats specified. Did you leave the formats array empty?`
    );

  const results = await Promise.allSettled(
    formats.map(async (thisFormat) => {
      switch (thisFormat) {
        case Format.epub:
          return await exportEpub(bookConfig, convertedContent, verbose);
      }
    })
  );

  if (results.length <= 0)
    throw new Error(
      `No valid format to render! Your formats include: ${formats}, but bindup can't render any of those`
    );

  return results;
};

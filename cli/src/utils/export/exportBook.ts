import type { BookConfig } from "../../types/BookConfig";
import chalk from "chalk";
import { Format } from "../../types/BookTypes";
import exportEpub from "./exportEpub";
import path from "path";
import getFonts from "../../book-styles/getFonts";
import markdownToHtml from "../convert/markdownToHtml";
import convertChapters from "../convert/convertChapters";
import getCSS from "../../book-styles/getCSS";
import isValidPath from "is-valid-path";

export default async (bookConfig: BookConfig): Promise<Buffer | void> => {
  try {
    const manuscriptPath = bookConfig.manuscript;
    const chapterArray = convertChapters(manuscriptPath);

    if (bookConfig.css === undefined) bookConfig.css = "";
    // try {
    //   const { cssPath } = bookConfig;
    //   if (cssPath && isValidPath(cssPath))
    //     bookConfig.css += await getCSS(cssPath);
    // } catch (error) {
    //   console.error(chalk.redBright("Failed to load CSS", error));
    // }

    bookConfig.css += getFonts(bookConfig);

    const convertedChapters = await markdownToHtml(
      chapterArray,
      manuscriptPath
    );
    return exportBasedOnFormat(bookConfig, convertedChapters);
  } catch (err) {
    return console.log("Failed to generate ebook.", err);
  }
};

const exportBasedOnFormat = async (
  bookConfig: BookConfig,
  convertedContent: any
): Promise<Buffer | void> => {
  console.log(
    chalk.blueBright(`Rendering to the following formats:`, bookConfig?.formats)
  );
  const { formats } = bookConfig;

  if (!formats) throw new Error("No valid format specified!");

  formats.forEach(async (thisFormat) => {
    switch (thisFormat) {
      case Format.epub:
        return await exportEpub(bookConfig, convertedContent);
    }
  });
};

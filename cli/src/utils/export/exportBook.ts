import { BookConfig, ConvertedContent } from "../../types/BookTypes";
import chalk from "chalk";
import showdown from "showdown";
import fs from "fs/promises";
import { Format } from "../../types/BookTypes";
import exportEpub from "./exportEpub";
import path from "path";
import readdirRecursive from "fs-readdir-recursive";

export default async (bookConfig: BookConfig): Promise<Buffer | void> => {
  try {
    const manPath = path.join("", bookConfig.manuscript);

    /*
    1. Read directory recursively
    2. Create an array to store items
    3. For each item, check what's next to every '\\'
    4. If it's already in the items array, ignore it
    5. If not, add it
    6. Regardless, trim everything from `\\` and back to index position 0
    7. Repeat the process
    */

    if (bookConfig?.css === undefined) bookConfig.css = "";

    bookConfig.css += styleBook(bookConfig);

    console.log(chalk.blueBright(`Converting files from "${manPath}"...`));
    const rawContents = readdirRecursive(manPath);

    const chapterArray: any[] = [];

    const directoryList = rawContents.map((item) =>
      item.replace("manuscript\\", "")
    );

    directoryList.forEach((item) => {
      item
        .split("\\")
        .map((segment) => {
          const splits = segment.split("~ ");
          return splits.length > 1
            ? splits.filter((_, i) => i > 0).join()
            : splits.toString();
        })
        .forEach((segment) => {
          !chapterArray.some((chapter) => chapter.title === segment) &&
            chapterArray.push({
              title: segment.replace(".md", ""),
              path: item,
              isSection: !segment.includes(".md"),
            });
        });
    });

    const convertedChapters = await markdownToHtml(chapterArray);
    return exportBasedOnFormat(bookConfig, convertedChapters);
  } catch (err) {
    return console.log("Failed to generate ebook.", err);
  }
};

const markdownToHtml = async (chapterArray: any[]): Promise<any> => {
  const converter = new showdown.Converter();

  // We need to recursively list all folders within manuscript and create chapters for them.

  return Promise.all(
    chapterArray.map(async (chapter) => {
      const convertedChapter = {
        ...chapter,
        content: "",
      };
      if (chapter.isSection) {
        return convertedChapter;
      }
      const content = await fs.readFile(
        `testbook\\manuscript\\${chapter.path}`
      );
      convertedChapter.content = converter.makeHtml(content.toString());
      return convertedChapter;
    })
  );
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

const styleBook = (bookConfig: BookConfig): string => {
  let configCSS = "";

  // Set default book-wide font
  if (bookConfig.defaultFontFamily)
    configCSS += ` p{ font-family: ${bookConfig.defaultFontFamily}; }`;

  if (bookConfig?.indentParagraphs) {
    configCSS += ` p {text-indent: ${bookConfig.indentParagraphs}px;}`;
  }

  if (bookConfig.tocFontFamily) {
    configCSS += ` li > a {font-family: ${bookConfig.tocFontFamily};}`;
  }

  if (bookConfig.fontClasses) {
    bookConfig.fontClasses.forEach(({ fontFamily, className }) => {
      if (!className || !fontFamily) return;
      configCSS += ` .${className}{ font-family: ${fontFamily}; }`;
    });
  }
  return configCSS;
};

import showdown from "showdown";
import fs from "fs/promises";
import printWhite from "../printWhite";
import throwIfPathInvalid from "../throwIfPathInvalid";
import matter = require("gray-matter");

export default async (
  chapterArray: any[],
  manuscriptPath: string,
  verbose = false
): Promise<any> => {
  // We need to recursively list all folders within manuscript and create chapters for them.

  return Promise.all(
    chapterArray.map(async (chapter) => {
      let convertedChapter = {
        ...chapter,
        content: "",
      };

      const path = `${manuscriptPath}\\manuscript\\${chapter.path}`;

      if (verbose)
        printWhite(`Converting ${chapter.title}" at ${path}" to HTML...`);

      if (chapter.isSection) {
        return convertedChapter;
      }
      try {
        throwIfPathInvalid(path, verbose);

        const rawContent = await fs.readFile(path);

        //Parse the frontmatter data and the content
        const { content, data } = matter(rawContent.toString());
        const converter = new showdown.Converter();
        const htmlContent = converter.makeHtml(content);
        if (data) {
          convertedChapter = {
            ...chapter,
            content: htmlContent,
            ...data,
          };
        } else {
          convertedChapter.content = htmlContent;
        }

        // if (chapter.title === "Jasheed 1-1")

        if (verbose)
          printWhite(`Successfully converted ${chapter.title}" at ${path}`);

        return convertedChapter;
      } catch (error) {
        throw new Error(`Failed to convert ${path}": \n ${error}`);
      }
    })
  );
};

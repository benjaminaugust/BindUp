import showdown from "showdown";
import fs from "fs/promises";
import printWhite from "../printWhite";
import throwIfPathInvalid from "../throwIfPathInvalid";

export default async (
  chapterArray: any[],
  manuscriptPath: string,
  verbose = false
): Promise<any> => {
  const converter = new showdown.Converter();

  // We need to recursively list all folders within manuscript and create chapters for them.

  return Promise.all(
    chapterArray.map(async (chapter) => {
      const convertedChapter = {
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

        const content = await fs.readFile(path);

        convertedChapter.content = converter.makeHtml(content.toString());

        if (verbose)
          printWhite(`Successfully converted ${chapter.title}" at ${path}`);

        return convertedChapter;
      } catch (error) {
        throw new Error(`Failed to convert ${path}": \n ${error}`);
      }
    })
  );
};

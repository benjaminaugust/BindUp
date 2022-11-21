import showdown from "showdown";
import fs from "fs/promises";

export default async (
  chapterArray: any[],
  manuscriptPath: string
): Promise<any> => {
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
        `${manuscriptPath}\\manuscript\\${chapter.path}`
      );
      convertedChapter.content = converter.makeHtml(content.toString());
      return convertedChapter;
    })
  );
};

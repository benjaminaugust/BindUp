import readdirRecursive from "fs-readdir-recursive";
import printWhite from "../printWhite";

export default (manuscriptPath: string, verbose = false): any[] => {
  printWhite(`Converting files from "${manuscriptPath}"...`);
  const rawContents = readdirRecursive(manuscriptPath);

  const directoryList = rawContents.map((item) =>
    item.replace("manuscript\\", "")
  );

  return createChapters(directoryList, verbose);
};

const createChapters = (directoryList: string[], verbose = false): any[] => {
  const chapterArray: any[] = [];

  if (verbose) printWhite(`Converting chapters...`);

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
        if (!chapterArray.some((chapter) => chapter.title === segment)) {
          chapterArray.push({
            title: segment.replace(".md", ""),
            path: item,
            isSection: !segment.includes(".md"),
          });
        }
      });
  });

  if (verbose)
    printWhite(
      `Got the following chapters: ${JSON.stringify(chapterArray, null, 2)}`
    );

  return chapterArray;
};

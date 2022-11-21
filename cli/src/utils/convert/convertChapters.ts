import readdirRecursive from "fs-readdir-recursive";
import chalk from "chalk";

export default (manuscriptPath: string): any[] => {
  console.log(chalk.blueBright(`Converting files from "${manuscriptPath}"...`));
  const rawContents = readdirRecursive(manuscriptPath);

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
        if (!chapterArray.some((chapter) => chapter.title === segment)) {
          chapterArray.push({
            title: segment.replace(".md", ""),
            path: item,
            isSection: !segment.includes(".md"),
          });
        }
      });
  });

  return chapterArray;
};

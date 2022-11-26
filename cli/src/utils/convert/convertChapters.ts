import chalk from "chalk";
import readdirRecursive from "fs-readdir-recursive";
import printBlue from "../printBlue";
import printWhite from "../printWhite";
import sortBy from "sort-by";

export default (manuscriptPath: string, verbose = false): any[] => {
  printWhite(`Converting files from "${manuscriptPath}"...`);
  const rawContents = readdirRecursive(
    manuscriptPath,
    (name) => !name.includes(".json")
  );

  const directoryList = rawContents.map((item) =>
    item.replace("manuscript\\", "")
  );

  return createChapters(directoryList, verbose);
};

const createChapters = (directoryList: string[], verbose = false): any[] => {
  if (verbose) printWhite(`Converting chapters...`);

  const segments = directoryList.map((item) => ({
    path: item,
    splits: item.split("\\"),
  }));

  const orderedSegments: any[] = segments
    .map((item) => {
      const { splits } = item;
      const currSplit = splits[0];
      const justTheNumber = currSplit.replace("~ ", "");
      const order = parseInt(justTheNumber);
      return {
        ...item,
        order,
      };
    })
    .sort(sortBy("order"));

  const reOrder = (segments: any) => {
    const orderList = segments.map((segment: any) => segment.order);
    const highestOrder = Math.max(...orderList);
    for (let i = 1; i <= highestOrder; i++) {
      const start = orderList.indexOf(i);
      const endIndex = orderList.lastIndexOf(i);

      if (start === endIndex) continue;

      const end = endIndex + 1;
      const setToOrder = segments.slice(start, end);
      const x = setToOrder
        .map((item: any) => {
          const currSplit = item.splits[1];
          const justTheNumber = currSplit.split("~ ")[0];
          const order = parseInt(justTheNumber);
          return {
            ...item,
            order: order,
          };
        })
        .sort(sortBy("order"))
        .map((segment: any) => ({ ...segment, order: i }));
      const segment1 = segments.slice(0, start);
      const segment2 = segments.slice(end);
      segments = [...segment1, ...x, ...segment2];
    }
    return segments;
  };

  const finalSegments = reOrder(orderedSegments);

  const sortedDirectoryList = finalSegments.map((segment: any) => segment.path);

  const chapterArray: any = [];

  sortedDirectoryList.forEach((item: any) => {
    item
      .split("\\")
      .map((segment: any) => {
        const splits = segment.split("~ ");
        if (splits.length < 1)
          throw new Error(`Invalid file or folder name: "${segment}"`);
        const result = splits.filter((_: any, i: number) => i > 0).join();
        const formattedSegment = {
          rawName: result,
          order: parseInt(splits[0]),
        };
        return formattedSegment;
      })
      .forEach(({ rawName, order }: any) => {
        if (!chapterArray.some((chapter: any) => chapter.title === rawName)) {
          const sectionData = {
            title: rawName.replace(".md", ""),
            path: item,
            isSection: !rawName.includes(".md"),
            order,
          };
          chapterArray.push(sectionData);
        }
      });
  });

  if (verbose)
    printWhite(
      `Got the following chapters: ${JSON.stringify(chapterArray, null, 2)}`
    );
  return chapterArray;
};

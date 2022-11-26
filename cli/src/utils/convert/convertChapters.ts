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

  // let currentSection: any;
  // directoryList.forEach((filePath) => {
  //   //Make an object to represent the file
  //   const fileData = {
  //     filePath,
  //     isSection: !filePath.includes(".md"),
  //     files: [],
  //   };

  //   //If the file is a section and we have no section
  //   //already defined, now that's the section we'll
  //   //start pushing stuff into. Return.
  //   if (fileData.isSection && !currentSection) {
  //     currentSection = fileData;
  //     return;
  //   }

  //   printWhite(`\nReading from filepath ${filePath}`);

  //   if (currentSection) {
  //     //If the file we're analyzing isn't a section,
  //     //and we already have a current section,
  //     //then check if the file should be in the section.
  //     //If so, push it into the current section and return.
  //     if (filePath.includes(currentSection.filePath))
  //       return currentSection.files.push(filePath);

  //     //File is not a section, or it's a new section,
  //     //or it's a file that doesn't belong to any section.
  //     //So push the current section. We're done with it
  //     chapterArray.push(currentSection);
  //   }

  //   //If it's a section, set current section to that. return
  //   if (fileData.isSection) {
  //     currentSection = fileData;
  //     return;
  //   }

  //   //It's not a section, and doesn't
  //   //belong to a section, so just push it
  //   chapterArray.push(fileData);
  //   //No current section exists. We just pushed
  //   //a plain file
  //   currentSection = null;
  // });

  // printBlue(JSON.stringify(chapterArray, null, 2));

  const segments = directoryList.map((item) => ({
    path: item,
    splits: item.split("\\"),
  }));

  // console.log(segments);

  const orderedSegments: any[] = segments
    .map((item) => {
      const { splits } = item;
      // for (let i = 0; i < splits.length - 1; i++) {
      const currSplit = splits[0];
      const justTheNumber = currSplit.replace("~ ", "");
      const order = parseInt(justTheNumber);
      // }
      return {
        ...item,
        order,
      };
    })
    .sort(sortBy("order"));

  // const orderedGroups: any = [];
  // const orderList = orderedSegments.map((segment) => segment.order);
  // for (let i = 1; i < orderedSegments.length; i++) {
  //   const start = orderList.indexOf(i);
  //   const end = orderList.lastIndexOf(i);
  //   // printBlue(orderedSegments[start].splits[0]);
  //   orderedGroups.push({
  //     // topPath:
  //     topOrder: i,
  //     group: orderedSegments.slice(start, end),
  //   });
  // }

  const reOrder = (segments: any) => {
    const orderList = segments.map((segment: any) => segment.order);
    const highestOrder = Math.max(...orderList);
    for (let i = 1; i <= highestOrder; i++) {
      const start = orderList.indexOf(i);
      const endIndex = orderList.lastIndexOf(i);

      if (start === endIndex) continue;

      const end = endIndex + 1;
      const setToOrder = segments.slice(start, end);
      // console.log(`i: ${i}, start: ${start}, end: ${end}`);
      // if (i == 17) console.log("Set to order", setToOrder);
      const x = setToOrder
        .map((item: any) => {
          const currSplit = item.splits[1];
          // if (j > 1) printBlue(`\nCurrsplit: ${currSplit}`);
          const justTheNumber = currSplit.split("~ ")[0];
          // if (i == 17)
          //   console.log(`split: ${currSplit}, number: ${justTheNumber}`);
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
      // if (i == 17) console.log("Set after reorder", x);
      // if (i == 17) console.log("New segments", segments);
    }
    return segments;
  };

  const finalSegments = reOrder(orderedSegments);

  // console.log(orderedSegments);
  // console.log(JSON.stringify(finalSegments, null, 2));

  const sortedDirectoryList = finalSegments.map((segment: any) => segment.path);

  const chapterArray: any = [];

  sortedDirectoryList.forEach((item: any) => {
    item
      .split("\\")
      .map((segment: any) => {
        const splits = segment.split("~ ");
        if (splits.length < 1)
          throw new Error(`Invalid file or folder name: "${segment}"`);
        // console.log(chalk.cyan(splits));
        const result = splits.filter((_: any, i: number) => i > 0).join();
        // console.log(chalk.cyan(result));
        const formattedSegment = {
          rawName: result,
          order: parseInt(splits[0]),
        };
        // console.log(chalk.cyan(JSON.stringify(formattedSegment, null, 2)));
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
          // printBlue(rawName);
          chapterArray.push(sectionData);
        }
      });
  });

  if (verbose)
    printWhite(
      `Got the following chapters: ${JSON.stringify(chapterArray, null, 2)}`
    );

  // console.log("ChapterArray", JSON.stringify(chapterArray, null, 2));

  //Cycle through
  //Check every item against each section
  return chapterArray;
};

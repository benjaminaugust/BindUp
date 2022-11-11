import { BookConfig, ConvertedContent } from '../../types/BookTypes';
import showdown from "showdown";
import fs from 'fs/promises';
import { Format } from "../../types/BookTypes";
import exportEpub from './exportEpub';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import readdirRecursive from 'fs-readdir-recursive'

export default async (bookConfig: BookConfig): Promise<void> => {
  try {
    const manPath = path.join('', bookConfig.manuscript)

    // console.log(JSON.stringify(await fs.readdir(manPath, { withFileTypes: true }), null, 2))

    /*
    1. Read directory recursively
    2. Create an array to store items
    3. For each item, check what's next to every '\\'
    4. If it's already in the items array, ignore it
    5. If not, add it
    6. Regardless, trim everything from `\\` and back to index position 0
    7. Repeat the process
    */

    const rawContents = readdirRecursive(manPath);

    const chapterArray: any[] = [];

    const directoryList = rawContents.map(item => item.replace('manuscript\\', ''));

    console.log(directoryList)
    // just use split, then filter

    directoryList.forEach(item => {
      item.split('\\')
        .map(segment => {
          const splits = segment.split('- ');
          return splits.length > 1 ?
            splits.filter((split, i) => i > 0).join()
            :
            splits.toString()
        })
        .forEach(segment => {
          !chapterArray.some(chapter => chapter.title === segment) &&
            chapterArray.push({
              title: segment,
              path: item
            })
        });
      // const splitItem = (i: any) => {
      //   console.log("This is what we're splitting", i)
      //   const start = i.indexOf('- ') + 2;
      //   const end = i.indexOf("\\");
      //   console.log("\n\nThis is at the start index", i[start])
      //   const newItem = i.slice(start, end);
      //   console.log("\n\nNew split", newItem + '\n\n')
      //   return newItem;
      // }

      // let split = splitItem(item);
      // const start = item.indexOf(split) + split.length
      // console.log("Next part", item.slice(start))//splitItem(item.slice(start)))
      // split = splitItem(item.slice(start))
      // console.log("\n\nSplit of next part", split)

      // if (split.includes('.md'))
      //   return chapterArray.push(split);

      // // while (!split.includes('.md')) {
      // if (!chapterArray.includes(split))
      //   chapterArray.push(split)

      // // }

    });

    console.log(chapterArray)

  } catch (err) {
    console.log('Failed to generate ebook.', err);
  }
}

const makeContentItemId = (title: string): string => {
  return title + `-${uuidv4()}-`;
}

const markdownToHtml = async (bookConfig: BookConfig): Promise<any> => {

  if (!bookConfig?.manuscript)
    throw new Error(`No manuscript path defined in Book Config:\n\n${bookConfig}`);

  const converter = new showdown.Converter();

  // We need to recursively list all folders within manuscript and create chapters for them.


}

const exportBasedOnFormat = async (bookConfig: BookConfig, convertedContent: ConvertedContent) => {

  const { formats } = bookConfig;

  if (!formats)
    throw new Error("No valid format specified!");

  formats.forEach(async (thisFormat) => {
    switch (thisFormat) {
      case Format.epub:
        await exportEpub(bookConfig, convertedContent);
        break;
    }
  })
}
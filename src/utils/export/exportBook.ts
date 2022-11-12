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

    // console.log(directoryList)
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
              title: segment.replace('.md', ''),
              path: item,
              isSection: !segment.includes('.md')
            })
        });
    });

    // console.log(chapterArray)
    const convertedChapters = await markdownToHtml(chapterArray)
    exportBasedOnFormat(bookConfig, convertedChapters)
  } catch (err) {
    console.log('Failed to generate ebook.', err);
  }
}

const makeContentItemId = (title: string): string => {
  return title + `-${uuidv4()}-`;
}

const markdownToHtml = async (chapterArray: any[]): Promise<any> => {
  const converter = new showdown.Converter();

  // We need to recursively list all folders within manuscript and create chapters for them.

  return Promise.all(chapterArray.map(async chapter => {
    const convertedChapter = {
      ...chapter,
      content: '',
    }
    if (chapter.isSection) {
      return convertedChapter
    }
    const content = await fs.readFile(`testbook\\manuscript\\${chapter.path}`)
    convertedChapter.content = converter.makeHtml(content.toString())
    return convertedChapter
  }))

}

const exportBasedOnFormat = async (bookConfig: BookConfig, convertedContent: any) => {

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
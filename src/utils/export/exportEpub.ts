import { ConvertedContent } from './../../types/BookTypes';
import epub from 'epub-gen-memory';
import { BookConfig } from '../../types/BookTypes';
import fs from 'fs/promises';


export default async (bookConfig: BookConfig, convertedContent: any) => {

  // const chapterArray = [];

  // if (!convertedContent?.chapters)
  //   throw new Error("No chapters found when converting to Epub!")

  // // We need to check for sections. If they exist, insert them into the array 
  // console.log(bookConfig.bookTitle)

  try {
    const content = await epub({
      title: bookConfig.bookTitle ?? "No title provided",
      author: bookConfig.bookAuthor ?? "No author provided"
    }, convertedContent
    );

    fs.writeFile(`${bookConfig.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
    console.log("Ebook Generated Successfully!");
  } catch (err) {
    console.error("Failed to generate Ebook because of ", err)
  }
}
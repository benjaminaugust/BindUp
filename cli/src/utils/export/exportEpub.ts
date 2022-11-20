import { ConvertedContent } from "./../../types/BookTypes";
import epub from "epub-gen-memory";
import { BookConfig } from "../../types/BookTypes";
import fs from "fs/promises";
import path from "path";

export default async (
  bookConfig: BookConfig,
  convertedContent: any
): Promise<Buffer | void> => {
  // const chapterArray = [];

  // if (!convertedContent?.chapters)
  //   throw new Error("No chapters found when converting to Epub!")

  // // We need to check for sections. If they exist, insert them into the array
  // console.log(bookConfig.bookTitle)

  try {
    const content = await epub({ ...bookConfig }, convertedContent);

    const outPath = path.join(
      `${bookConfig.outDir ?? ""}`,
      `${bookConfig.title.replace(" ", "-").replace(":", "").replace(",", "")}`
    );

    fs.writeFile(outPath, content);
    console.log("Ebook Generated Successfully!");
    return content;
  } catch (err) {
    console.error("Failed to generate Ebook because of ", err);
  }
};

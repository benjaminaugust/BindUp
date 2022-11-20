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
    let content = await epub({ ...bookConfig }, convertedContent);
    await writeEpub(bookConfig, content);
    return content;
  } catch (err: any) {
    return console.error(`Failed to render. ${bookConfig?.title}`, err);
  }
};

const writeEpub = async (
  bookConfig: BookConfig,
  content: Buffer
): Promise<void> => {
  const outPath = path.join(
    `${bookConfig.outDir ?? ""}`,
    `${bookConfig.title.replace(" ", "-").replace(":", "").replace(",", "")}`
  );
  try {
    if (bookConfig.outDir)
      await fs.mkdir(bookConfig.outDir, { recursive: true });

    await fs.writeFile(outPath, content);
    console.log("Ebook Generated Successfully!");
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.error(`Failed to write Ebook file to ${outPath}`);
    }
    throw err;
  }
};

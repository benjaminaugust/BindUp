import epub from "epub-gen-memory";
import type { BookConfig } from "../../types/BookConfig";
import fs from "fs/promises";
import chalk from "chalk";
import path from "path";

export default async (
  bookConfig: BookConfig,
  convertedContent: any
): Promise<Buffer | void> => {
  // const chapterArray = [];
  console.log(chalk.blueBright(`Exporting epub...`));
  // if (!convertedContent?.chapters)
  //   throw new Error("No chapters found when converting to Epub!")

  // // We need to check for sections. If they exist, insert them into the array
  // console.log(bookConfig.bookTitle)

  try {
    let content = await epub({ ...bookConfig }, convertedContent);
    await writeEpub(bookConfig, content);
    return content;
  } catch (err: any) {
    return console.error(
      chalk.redBright(`Failed to render. ${bookConfig?.title}`, err)
    );
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
    console.log(
      chalk.whiteBright(
        `Successfully generated ${bookConfig.title} in ${
          bookConfig.outDir || "the current directory"
        }!`
      )
    );
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.error(
        chalk.redBright(`Failed to write Ebook file to ${outPath}`)
      );
    }
    throw err;
  }
};

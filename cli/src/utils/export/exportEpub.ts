import epub from "epub-gen-memory";
import type { BookConfig } from "../../types/BookConfig";
import fs from "fs/promises";
import path from "path";
import printRed from "../printRed";
import printWhite from "../printWhite";
import throwIfPathInvalid from "../throwIfPathInvalid";

export default async (
  bookConfig: BookConfig,
  convertedContent: any,
  verbose = false
): Promise<Buffer | void> => {
  printWhite(`Exporting epub...`);
  try {
    let content = await epub({ ...bookConfig }, convertedContent);
    await writeEpub(bookConfig, content, verbose);
    return content;
  } catch (err: any) {
    return printRed(`Failed to render ${bookConfig?.title}`, err);
  }
};

const writeEpub = async (
  bookConfig: BookConfig,
  content: Buffer,
  verbose = false
): Promise<void> => {
  try {
    const outPath = path.join(
      `${bookConfig.outDir ?? ""}`,
      `${bookConfig.title.replace(" ", "-").replace(":", "").replace(",", "")}`
    );

    if (verbose) printWhite(`Writing epub to ${outPath}"...`);

    throwIfPathInvalid(outPath, verbose);

    const { outDir } = bookConfig;
    if (outDir) {
      throwIfPathInvalid(outDir);
      await fs.mkdir(outDir, { recursive: true });
    }

    await fs.writeFile(outPath, content);
    printWhite(
      `Successfully generated ${bookConfig.title}" in ${
        bookConfig.outDir || "the current directory"
      }!`
    );
  } catch (err: any) {
    if (err.code === "ENOENT") {
      throw new Error(`Failed to write Ebook file. \n${err}`);
    }
    throw err;
  }
};

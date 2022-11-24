import fs from "fs/promises";
import printWhite from "../utils/printWhite";
import throwIfPathInvalid from "../utils/throwIfPathInvalid";

export default async (cssFile: string, verbose = false): Promise<string> => {
  if (verbose) printWhite(`Trying to load css from ${cssFile} ...`);
  throwIfPathInvalid(cssFile);
  const rawFile = await fs.readFile(cssFile);
  return rawFile.toString();
};

import fs from "fs/promises";
import printBlue from "../utils/printBlue";
import throwIfPathInvalid from "../utils/throwIfPathInvalid";

export default async (cssFile: string, verbose = false): Promise<string> => {
  if (verbose) printBlue(`Trying to load css from ${cssFile} ...`);
  throwIfPathInvalid(cssFile);
  const rawFile = await fs.readFile(cssFile);
  return rawFile.toString();
};

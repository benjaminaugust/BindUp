import path from "path";
import fs from "fs/promises";

export default async (cssPath: string): Promise<string> => {
  try {
    const cssFile = await fs.readFile(cssPath);
  } catch (error) {}
  return "";
};

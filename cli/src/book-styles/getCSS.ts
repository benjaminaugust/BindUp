import fs from "fs/promises";

export default async (cssFile: string): Promise<string> => {
  try {
    const rawFile = await fs.readFile(cssFile);
    return rawFile.toString();
  } catch (error) {
    console.log("You specified a CSS file, but it failed to load.", error);
    return "";
  }
};

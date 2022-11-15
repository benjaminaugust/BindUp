#! /usr/bin/env node
import { program } from "commander";
import type { BookConfig } from "./types/BookTypes";
import exportBook from "./utils/export/exportBook";
import { initSchemas } from "./utils/schema/initSchema";
import { validateBookConfig } from "./utils/schema/validateBookConfig";
import fs from "fs/promises";
import path from "path";
import process from "process";
import chalk from "chalk";

const generateBook = async (configPath: string) => {
  const rawConfigFile = await fs.readFile(path.join(process.cwd(), configPath));
  const rawConfigString = rawConfigFile.toString();
  const bookConfig: BookConfig = JSON.parse(rawConfigString);
  const ajv = initSchemas();
  if (!validateBookConfig(ajv, bookConfig)) {
    return console.error(
      chalk.yellowBright(
        `\nFailed to render "${bookConfig?.title || "book"}"\n`
      )
    );
  }

  await exportBook(bookConfig);
};

program
  .command("render <book-config>")
  .description("Render your book into an epub file")
  .action(generateBook);

program.parse();

export { generateBook };

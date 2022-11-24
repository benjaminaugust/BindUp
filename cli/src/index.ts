#! /usr/bin/env node
import { program } from "commander";
import type { BookConfig } from "./types/BookConfig";
import exportBook from "./utils/export/exportBook";
import { initSchemas } from "./utils/schema/initSchema";
import { validateBookConfig } from "./utils/schema/validateBookConfig";
import fs from "fs/promises";
import path from "path";
import process from "process";
import { version } from "../package.json";
import printRed from "./utils/printRed";
import printBlue from "./utils/printBlue";

const generateBook = async (
  configPath: string
): Promise<PromiseSettledResult<void | Buffer>[] | void> => {
  const { outdir, verbose } = program.opts();

  if (verbose) printBlue(`Printing verbose information...`);

  const rawConfigFile = await fs.readFile(path.join(process.cwd(), configPath));
  const rawConfigString = rawConfigFile.toString();
  const bookConfig: BookConfig = JSON.parse(rawConfigString);

  if (outdir) bookConfig.outDir = outdir;

  const ajv = initSchemas(verbose);
  if (!validateBookConfig(ajv, bookConfig, verbose)) return;

  const epub = await exportBook(bookConfig, verbose);
  if (!epub) {
    return console.error(
      printRed(
        `\nFailed to render ${bookConfig?.title || "book"}"\n`,
        new Error("Epub is null somehow.")
      )
    );
  }
  return epub;
};

const cliMethod = generateBook as (configPath: string) => Promise<void>;

program
  .command("render <book-config>")
  .description("Render your book into an epub file")
  .action(cliMethod);

program
  .option(
    "-o, --outdir <directory>",
    "Set the directory the book will be rendered to"
  )
  .option(
    "--verbose",
    "Print verbose messages to the terminal while rendering"
  );

program.version(
  version,
  "-v, --version",
  "output the current version of bindup"
);

program.parse();

export { generateBook };

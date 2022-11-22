import AJV from "ajv";
import type { BookConfig } from "../../types/BookConfig";
import chalk from "chalk";

export const validateBookConfig = (
  ajv: AJV,
  bookConfig: BookConfig,
  verbose = false
): boolean => {
  if (verbose)
    console.log(
      chalk.blueBright(`Validating ${bookConfig.title}'s config file`)
    );

  try {
    const validate = ajv.getSchema("book");
    if (!validate)
      throw new Error("Fatal bindup error. Book schema did not load.");

    if (validate(bookConfig)) {
      if (verbose)
        console.log(chalk.blueBright("Config successfully validated!"));
      return true;
    }

    if (validate.errors) {
      throw new Error(
        `Your configuration file is invalid. Your book config must match the bindup book config schema. Check the docs. The following issues occurred: ${validate.errors.map(
          (err) =>
            `\nAt ${err.instancePath} -\nBook config error: ${err.message}`
        )}`
      );
    }
    // for (const err of validate.errors) {
    //   if (err.instancePath)
    //     console.error(
    //       chalk.redBright(
    //         `\nAt ${err.instancePath} - \nBook config error: ${err.message}`
    //       )
    //     );
    // }
  } catch (error) {
    console.error(chalk.redBright(`\nFailed to validate config file!`, error));
  }
  return false;
};

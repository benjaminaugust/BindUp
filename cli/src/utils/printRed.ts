import chalk from "chalk";

export default (message: string, error: unknown) => {
  return console.error(chalk.redBright(message, error));
};

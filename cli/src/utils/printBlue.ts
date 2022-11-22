import chalk from "chalk";

export default (message: string): void => {
  return console.log(chalk.blueBright(message));
};

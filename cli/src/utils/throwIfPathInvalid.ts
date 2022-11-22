import isValidPath from "is-valid-path";
import printBlue from "./printBlue";

export default (path: string, verbose = false): void => {
  if (verbose) printBlue(`Checking validity of path ${path} ...`);

  if (!isValidPath(path)) throw new Error(`${path} is not a valid path!`);

  if (verbose) printBlue(`${path} successfully validated!`);
};

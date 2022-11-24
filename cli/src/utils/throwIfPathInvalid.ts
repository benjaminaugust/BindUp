import isValidPath from "is-valid-path";
import printWhite from "./printWhite";

export default (path: string, verbose = false): void => {
  if (verbose) printWhite(`Checking validity of path ${path}" ...`);

  if (!isValidPath(path)) throw new Error(`${path} is not a valid path!`);

  if (verbose) printWhite(`${path} successfully validated!`);
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_path_1 = __importDefault(require("is-valid-path"));
const printBlue_1 = __importDefault(require("./printBlue"));
exports.default = (path, verbose = false) => {
    if (verbose)
        (0, printBlue_1.default)(`Checking validity of path ${path} ...`);
    if (!(0, is_valid_path_1.default)(path))
        throw new Error(`${path} is not a valid path!`);
    if (verbose)
        (0, printBlue_1.default)(`${path} successfully validated!`);
};

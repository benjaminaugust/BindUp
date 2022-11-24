#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBook = void 0;
const commander_1 = require("commander");
const exportBook_1 = __importDefault(require("./utils/export/exportBook"));
const initSchema_1 = require("./utils/schema/initSchema");
const validateBookConfig_1 = require("./utils/schema/validateBookConfig");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const package_json_1 = require("../package.json");
const printRed_1 = __importDefault(require("./utils/printRed"));
const printBlue_1 = __importDefault(require("./utils/printBlue"));
const generateBook = (configPath) => __awaiter(void 0, void 0, void 0, function* () {
    const { outdir, verbose } = commander_1.program.opts();
    if (verbose)
        (0, printBlue_1.default)(`Printing verbose information...`);
    const rawConfigFile = yield promises_1.default.readFile(path_1.default.join(process_1.default.cwd(), configPath));
    const rawConfigString = rawConfigFile.toString();
    const bookConfig = JSON.parse(rawConfigString);
    if (outdir)
        bookConfig.outDir = outdir;
    const ajv = (0, initSchema_1.initSchemas)(verbose);
    if (!(0, validateBookConfig_1.validateBookConfig)(ajv, bookConfig, verbose))
        return;
    const epub = yield (0, exportBook_1.default)(bookConfig, verbose);
    if (!epub) {
        return console.error((0, printRed_1.default)(`\nFailed to render ${(bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.title) || "book"}"\n`, new Error("Epub is null somehow.")));
    }
    return epub;
});
exports.generateBook = generateBook;
const cliMethod = generateBook;
commander_1.program
    .command("render <book-config>")
    .description("Render your book into an epub file")
    .action(cliMethod);
commander_1.program
    .option("-o, --outdir <directory>", "Set the directory the book will be rendered to")
    .option("--verbose", "Print verbose messages to the terminal while rendering");
commander_1.program.version(package_json_1.version, "-v, --version", "output the current version of bindup");
commander_1.program.parse();

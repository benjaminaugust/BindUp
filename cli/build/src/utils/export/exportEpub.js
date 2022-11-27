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
const epub_gen_memory_1 = __importDefault(require("epub-gen-memory"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const printRed_1 = __importDefault(require("../printRed"));
const printWhite_1 = __importDefault(require("../printWhite"));
const throwIfPathInvalid_1 = __importDefault(require("../throwIfPathInvalid"));
exports.default = (bookConfig, convertedContent, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    (0, printWhite_1.default)(`Exporting epub...`);
    try {
        let content = yield (0, epub_gen_memory_1.default)(Object.assign({}, bookConfig), convertedContent);
        yield writeEpub(bookConfig, content, verbose);
        return content;
    }
    catch (err) {
        return (0, printRed_1.default)(`Failed to render ${bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.title}`, err);
    }
});
const writeEpub = (bookConfig, content, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const outPath = path_1.default.join(`${(_a = bookConfig.outDir) !== null && _a !== void 0 ? _a : ""}`, `${bookConfig.title.replace(" ", "-").replace(":", "").replace(",", "")}`);
        if (verbose)
            (0, printWhite_1.default)(`Writing epub to ${outPath}"...`);
        (0, throwIfPathInvalid_1.default)(outPath, verbose);
        const { outDir } = bookConfig;
        if (outDir) {
            (0, throwIfPathInvalid_1.default)(outDir);
            yield promises_1.default.mkdir(outDir, { recursive: true });
        }
        yield promises_1.default.writeFile(outPath, content);
        (0, printWhite_1.default)(`Successfully generated ${bookConfig.title}" in ${bookConfig.outDir || "the current directory"}!`);
    }
    catch (err) {
        if (err.code === "ENOENT") {
            throw new Error(`Failed to write Ebook file. \n${err}`);
        }
        throw err;
    }
});

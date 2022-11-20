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
const chalk_1 = __importDefault(require("chalk"));
const showdown_1 = __importDefault(require("showdown"));
const promises_1 = __importDefault(require("fs/promises"));
const BookTypes_1 = require("../../types/BookTypes");
const exportEpub_1 = __importDefault(require("./exportEpub"));
const path_1 = __importDefault(require("path"));
const fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
exports.default = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manPath = path_1.default.join("", bookConfig.manuscript);
        /*
        1. Read directory recursively
        2. Create an array to store items
        3. For each item, check what's next to every '\\'
        4. If it's already in the items array, ignore it
        5. If not, add it
        6. Regardless, trim everything from `\\` and back to index position 0
        7. Repeat the process
        */
        if (bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.indentParagraphs) {
            if ((bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.css) === undefined)
                bookConfig.css = "";
            bookConfig.css += `p {text-indent: ${bookConfig.indentParagraphs}px}`;
        }
        console.log(chalk_1.default.blueBright(`Converting files from "${manPath}"...`));
        const rawContents = (0, fs_readdir_recursive_1.default)(manPath);
        const chapterArray = [];
        const directoryList = rawContents.map((item) => item.replace("manuscript\\", ""));
        directoryList.forEach((item) => {
            item
                .split("\\")
                .map((segment) => {
                const splits = segment.split("~ ");
                return splits.length > 1
                    ? splits.filter((_, i) => i > 0).join()
                    : splits.toString();
            })
                .forEach((segment) => {
                !chapterArray.some((chapter) => chapter.title === segment) &&
                    chapterArray.push({
                        title: segment.replace(".md", ""),
                        path: item,
                        isSection: !segment.includes(".md"),
                    });
            });
        });
        const convertedChapters = yield markdownToHtml(chapterArray);
        return exportBasedOnFormat(bookConfig, convertedChapters);
    }
    catch (err) {
        return console.log("Failed to generate ebook.", err);
    }
});
const markdownToHtml = (chapterArray) => __awaiter(void 0, void 0, void 0, function* () {
    const converter = new showdown_1.default.Converter();
    // We need to recursively list all folders within manuscript and create chapters for them.
    return Promise.all(chapterArray.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        const convertedChapter = Object.assign(Object.assign({}, chapter), { content: "" });
        if (chapter.isSection) {
            return convertedChapter;
        }
        const content = yield promises_1.default.readFile(`testbook\\manuscript\\${chapter.path}`);
        convertedChapter.content = converter.makeHtml(content.toString());
        return convertedChapter;
    })));
});
const exportBasedOnFormat = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.blueBright(`Rendering to the following formats:`, bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.formats));
    const { formats } = bookConfig;
    if (!formats)
        throw new Error("No valid format specified!");
    formats.forEach((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                return yield (0, exportEpub_1.default)(bookConfig, convertedContent);
        }
    }));
});

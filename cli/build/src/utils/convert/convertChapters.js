"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
const printWhite_1 = __importDefault(require("../printWhite"));
exports.default = (manuscriptPath, verbose = false) => {
    (0, printWhite_1.default)(`Converting files from "${manuscriptPath}"...`);
    const rawContents = (0, fs_readdir_recursive_1.default)(manuscriptPath);
    const directoryList = rawContents.map((item) => item.replace("manuscript\\", ""));
    return createChapters(directoryList, verbose);
};
const createChapters = (directoryList, verbose = false) => {
    const chapterArray = [];
    if (verbose)
        (0, printWhite_1.default)(`Converting chapters...`);
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
            if (!chapterArray.some((chapter) => chapter.title === segment)) {
                chapterArray.push({
                    title: segment.replace(".md", ""),
                    path: item,
                    isSection: !segment.includes(".md"),
                });
            }
        });
    });
    if (verbose)
        (0, printWhite_1.default)(`Got the following chapters: ${JSON.stringify(chapterArray, null, 2)}`);
    return chapterArray;
};

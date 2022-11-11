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
const showdown_1 = __importDefault(require("showdown"));
const BookTypes_1 = require("../../types/BookTypes");
const exportEpub_1 = __importDefault(require("./exportEpub"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
exports.default = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manPath = path_1.default.join('', bookConfig.manuscript);
        // console.log(JSON.stringify(await fs.readdir(manPath, { withFileTypes: true }), null, 2))
        /*
        1. Read directory recursively
        2. Create an array to store items
        3. For each item, check what's next to every '\\'
        4. If it's already in the items array, ignore it
        5. If not, add it
        6. Regardless, trim everything from `\\` and back to index position 0
        7. Repeat the process
        */
        const rawContents = (0, fs_readdir_recursive_1.default)(manPath);
        const chapterArray = [];
        const directoryList = rawContents.map(item => item.replace('manuscript\\', ''));
        console.log(directoryList);
        // just use split, then filter
        directoryList.forEach(item => {
            item.split('\\')
                .map(segment => {
                const splits = segment.split('- ');
                return splits.length > 1 ?
                    splits.filter((split, i) => i > 0).join()
                    :
                        splits.toString();
            })
                .forEach(segment => {
                !chapterArray.some(chapter => chapter.title === segment) &&
                    chapterArray.push({
                        title: segment,
                        path: item
                    });
            });
            // const splitItem = (i: any) => {
            //   console.log("This is what we're splitting", i)
            //   const start = i.indexOf('- ') + 2;
            //   const end = i.indexOf("\\");
            //   console.log("\n\nThis is at the start index", i[start])
            //   const newItem = i.slice(start, end);
            //   console.log("\n\nNew split", newItem + '\n\n')
            //   return newItem;
            // }
            // let split = splitItem(item);
            // const start = item.indexOf(split) + split.length
            // console.log("Next part", item.slice(start))//splitItem(item.slice(start)))
            // split = splitItem(item.slice(start))
            // console.log("\n\nSplit of next part", split)
            // if (split.includes('.md'))
            //   return chapterArray.push(split);
            // // while (!split.includes('.md')) {
            // if (!chapterArray.includes(split))
            //   chapterArray.push(split)
            // // }
        });
        console.log(chapterArray);
    }
    catch (err) {
        console.log('Failed to generate ebook.', err);
    }
});
const makeContentItemId = (title) => {
    return title + `-${(0, uuid_1.v4)()}-`;
};
const markdownToHtml = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.manuscript))
        throw new Error(`No manuscript path defined in Book Config:\n\n${bookConfig}`);
    const converter = new showdown_1.default.Converter();
    // We need to recursively list all folders within manuscript and create chapters for them.
});
const exportBasedOnFormat = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    const { formats } = bookConfig;
    if (!formats)
        throw new Error("No valid format specified!");
    formats.forEach((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                yield (0, exportEpub_1.default)(bookConfig, convertedContent);
                break;
        }
    }));
});

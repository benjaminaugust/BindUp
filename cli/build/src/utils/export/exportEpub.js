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
exports.default = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    // const chapterArray = [];
    var _a;
    // if (!convertedContent?.chapters)
    //   throw new Error("No chapters found when converting to Epub!")
    // // We need to check for sections. If they exist, insert them into the array
    // console.log(bookConfig.bookTitle)
    try {
        const content = yield (0, epub_gen_memory_1.default)(Object.assign({}, bookConfig), convertedContent);
        const outPath = path_1.default.join(`${(_a = bookConfig.outDir) !== null && _a !== void 0 ? _a : ""}`, `${bookConfig.title.replace(" ", "-").replace(":", "").replace(",", "")}`);
        promises_1.default.writeFile(outPath, content);
        console.log("Ebook Generated Successfully!");
        return content;
    }
    catch (err) {
        console.error("Failed to generate Ebook because of ", err);
    }
});

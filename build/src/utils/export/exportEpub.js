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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    // const chapterArray = [];
    // if (!convertedContent?.chapters)
    //   throw new Error("No chapters found when converting to Epub!")
    // // We need to check for sections. If they exist, insert them into the array 
    // console.log(bookConfig.bookTitle)
    // try {
    //   const content = await epub({
    //     title: bookConfig.bookTitle ?? "No title provided",
    //     author: bookConfig.bookAuthor ?? "No author provided"
    //   },
    //     chapterArray);
    //   // fs.writeFile(`${bookConfig.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
    //   console.log("Ebook Generated Successfully!");
    // } catch (err) {
    //   console.error("Failed to generate Ebook because of ", err)
    // }
});

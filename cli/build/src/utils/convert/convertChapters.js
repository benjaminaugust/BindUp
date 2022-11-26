"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_readdir_recursive_1 = __importDefault(require("fs-readdir-recursive"));
const printWhite_1 = __importDefault(require("../printWhite"));
const sort_by_1 = __importDefault(require("sort-by"));
exports.default = (manuscriptPath, verbose = false) => {
    (0, printWhite_1.default)(`Converting files from "${manuscriptPath}"...`);
    const rawContents = (0, fs_readdir_recursive_1.default)(manuscriptPath, (name) => !name.includes(".json"));
    const directoryList = rawContents.map((item) => item.replace("manuscript\\", ""));
    return createChapters(directoryList, verbose);
};
const createChapters = (directoryList, verbose = false) => {
    if (verbose)
        (0, printWhite_1.default)(`Converting chapters...`);
    const segments = directoryList.map((item) => ({
        path: item,
        splits: item.split("\\"),
    }));
    const orderedSegments = segments
        .map((item) => {
        const { splits } = item;
        const currSplit = splits[0];
        const justTheNumber = currSplit.replace("~ ", "");
        const order = parseInt(justTheNumber);
        return Object.assign(Object.assign({}, item), { order });
    })
        .sort((0, sort_by_1.default)("order"));
    const reOrder = (segments) => {
        const orderList = segments.map((segment) => segment.order);
        const highestOrder = Math.max(...orderList);
        for (let i = 1; i <= highestOrder; i++) {
            const start = orderList.indexOf(i);
            const endIndex = orderList.lastIndexOf(i);
            if (start === endIndex)
                continue;
            const end = endIndex + 1;
            const setToOrder = segments.slice(start, end);
            const x = setToOrder
                .map((item) => {
                const currSplit = item.splits[1];
                const justTheNumber = currSplit.split("~ ")[0];
                const order = parseInt(justTheNumber);
                return Object.assign(Object.assign({}, item), { order: order });
            })
                .sort((0, sort_by_1.default)("order"))
                .map((segment) => (Object.assign(Object.assign({}, segment), { order: i })));
            const segment1 = segments.slice(0, start);
            const segment2 = segments.slice(end);
            segments = [...segment1, ...x, ...segment2];
        }
        return segments;
    };
    const finalSegments = reOrder(orderedSegments);
    const sortedDirectoryList = finalSegments.map((segment) => segment.path);
    const chapterArray = [];
    sortedDirectoryList.forEach((item) => {
        item
            .split("\\")
            .map((segment) => {
            const splits = segment.split("~ ");
            if (splits.length < 1)
                throw new Error(`Invalid file or folder name: "${segment}"`);
            const result = splits.filter((_, i) => i > 0).join();
            const formattedSegment = {
                rawName: result,
                order: parseInt(splits[0]),
            };
            return formattedSegment;
        })
            .forEach(({ rawName, order }) => {
            if (!chapterArray.some((chapter) => chapter.title === rawName)) {
                const sectionData = {
                    title: rawName.replace(".md", ""),
                    path: item,
                    isSection: !rawName.includes(".md"),
                    order,
                };
                chapterArray.push(sectionData);
            }
        });
    });
    if (verbose)
        (0, printWhite_1.default)(`Got the following chapters: ${JSON.stringify(chapterArray, null, 2)}`);
    return chapterArray;
};

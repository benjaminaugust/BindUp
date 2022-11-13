"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookConfig = void 0;
const chalk_1 = __importDefault(require("chalk"));
const validateBookConfig = (ajv, bookConfig) => {
    const validate = ajv.getSchema('book');
    if (!validate) {
        console.log("Validate broke");
        return false;
    }
    if (validate(bookConfig)) {
        console.log('Success validating');
        return true;
    }
    if (validate.errors) {
        console.log(chalk_1.default.bold.black.bgWhite(`\nInvalid book config file. Your book config must match the writedown book config schema. Check the docs.`));
        let x = 0;
        for (const err of validate.errors) {
            if (err.instancePath)
                console.error(chalk_1.default.red.bold('\nAt ' + err.instancePath));
            console.error(chalk_1.default.red.bold('\nBook config error: ' + err.message));
        }
    }
    return false;
};
exports.validateBookConfig = validateBookConfig;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookConfig = void 0;
const chalk_1 = __importDefault(require("chalk"));
const validateBookConfig = (ajv, bookConfig, verbose = false) => {
    if (verbose)
        console.log(chalk_1.default.blueBright(`Validating ${bookConfig.title}'s config file`));
    try {
        const validate = ajv.getSchema("book");
        if (!validate)
            throw new Error("Fatal bindup error. Book schema did not load.");
        if (validate(bookConfig)) {
            if (verbose)
                console.log(chalk_1.default.blueBright("Config successfully validated!"));
            return true;
        }
        if (validate.errors) {
            throw new Error(`Your configuration file is invalid. Your book config must match the bindup book config schema. Check the docs. The following issues occurred: ${validate.errors.map((err) => `\nAt ${err.instancePath} -\nBook config error: ${err.message}`)}`);
        }
        // for (const err of validate.errors) {
        //   if (err.instancePath)
        //     console.error(
        //       chalk.redBright(
        //         `\nAt ${err.instancePath} - \nBook config error: ${err.message}`
        //       )
        //     );
        // }
    }
    catch (error) {
        console.error(chalk_1.default.redBright(`\nFailed to validate config file!`, error));
    }
    return false;
};
exports.validateBookConfig = validateBookConfig;

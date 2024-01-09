"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.day1 = void 0;
const fs = __importStar(require("fs"));
const mappingArray = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
const mapStringToInt = (text) => {
    const keys = Object.keys(mappingArray);
    if (keys.includes(text)) {
        return mappingArray[text];
    }
    return parseInt(text);
};
const findFirstAndLastDigit = (text) => {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    const result = text.matchAll(regex);
    const resultArray = Array.from(result, (data) => {
        return data[1];
    });
    if (!resultArray) {
        return null;
    }
    const firstDigitRaw = resultArray[0];
    const firstDigit = mapStringToInt(firstDigitRaw);
    const lastDigitRaw = resultArray.length > 1 ? resultArray[resultArray.length - 1] : firstDigit.toString();
    const lastDigit = mapStringToInt(lastDigitRaw);
    return {
        first: firstDigit,
        last: lastDigit,
    };
};
const day1 = () => {
    const fileContent = fs.readFileSync("src/day1/example1.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    let i = 1;
    const sum = lines.reduce((acc, line) => {
        const firstAndLastDigit = findFirstAndLastDigit(line);
        if (firstAndLastDigit === null) {
            return acc;
        }
        const numberForLine = `${firstAndLastDigit === null || firstAndLastDigit === void 0 ? void 0 : firstAndLastDigit.first}${firstAndLastDigit === null || firstAndLastDigit === void 0 ? void 0 : firstAndLastDigit.last}`;
        console.log(i);
        i++;
        console.log(numberForLine);
        return parseInt(numberForLine) + acc;
    }, 0);
    console.log(sum);
};
exports.day1 = day1;

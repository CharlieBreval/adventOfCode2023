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
exports.day4 = void 0;
const fs = __importStar(require("node:fs"));
const day4 = () => {
    const fileContent = fs.readFileSync("src/day4/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    const result = lines.reduce((acc, curr) => {
        const matchResult = curr.matchAll(/^[^:]*: (.+)\| (.+)/g);
        const matchResultArray = Array.from(matchResult);
        if (matchResultArray.length === 0) {
            return acc;
        }
        const winningNumbers = matchResultArray[0][1]
            .split(" ")
            .filter((number) => number !== "")
            .map((number) => parseInt(number));
        const ourNumbers = matchResultArray[0][2]
            .split(" ")
            .filter((number) => number !== "")
            .map((number) => parseInt(number));
        const numberOfWinningNumberByLine = ourNumbers.reduce((acc1, curr1) => {
            if (winningNumbers.includes(curr1)) {
                return acc1 + 1;
            }
            return acc1;
        }, 0);
        return numberOfWinningNumberByLine > 0 ? acc + Math.pow(2, numberOfWinningNumberByLine - 1) : acc;
    }, 0);
    console.log(result);
};
exports.day4 = day4;

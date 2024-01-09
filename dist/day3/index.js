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
exports.day3 = void 0;
const fs = __importStar(require("node:fs"));
const _ = __importStar(require("lodash"));
let treasureMap = _.range(1, 141).map(() => {
    return _.range(1, 141).map(() => ".");
});
function isSpecialChar(char) {
    return char.match(/[^a-zA-Z0-9|.]/);
}
function targetSpecialChar(treasureMap, indexLine, indexCol) {
    treasureMap[indexLine - 1][indexCol - 1] = "T";
    treasureMap[indexLine - 1][indexCol] = "T";
    treasureMap[indexLine - 1][indexCol + 1] = "T";
    treasureMap[indexLine][indexCol - 1] = "T";
    treasureMap[indexLine][indexCol] = "T";
    treasureMap[indexLine][indexCol + 1] = "T";
    treasureMap[indexLine + 1][indexCol - 1] = "T";
    treasureMap[indexLine + 1][indexCol] = "T";
    treasureMap[indexLine + 1][indexCol + 1] = "T";
}
function writeTreasureMap() {
    const stringifiedLines = treasureMap.map((line) => line.join(""));
    const string = stringifiedLines.join("\n");
    fs.writeFileSync("src/day3/treasureMap.txt", string);
}
function isNumberValid(line, numberInLine, positionInLine) {
    const result = [...numberInLine].map((number, index) => {
        const numberPosition = positionInLine + index;
        if (treasureMap[line - 1][numberPosition - 1] === "T") {
            return true;
        }
        return false;
    });
    return result.includes(true);
}
const day3 = () => {
    const fileContent = fs.readFileSync("src/day3/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    lines.map((line, indexLine) => {
        [...line].forEach((lineChar, indexCol) => {
            if (isSpecialChar(lineChar)) {
                targetSpecialChar(treasureMap, indexLine, indexCol);
            }
        });
        return 0;
    });
    const sum = lines.reduce((acc, line, lineIdx) => {
        const regex = /(\d+)/g;
        const matchResult = line.matchAll(regex);
        const matchResultArray = Array.from(matchResult);
        const sumLine = matchResultArray.reduce((acc, result) => {
            const index = result["index"] || 0;
            if (isNumberValid(lineIdx + 1, result[0], index + 1)) {
                return acc + parseInt(result[0]);
            }
            return acc;
        }, 0);
        return acc + sumLine;
    }, 0);
    console.log(sum);
    writeTreasureMap();
};
exports.day3 = day3;

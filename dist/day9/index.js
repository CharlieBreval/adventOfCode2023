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
exports.day9 = void 0;
const fs = __importStar(require("node:fs"));
function guessSubLine(suite) {
    const newLine = [];
    let lastNumber = suite[0];
    for (let i = 1; i <= suite.length - 1; i++) {
        newLine.push(suite[i] - lastNumber);
        lastNumber = suite[i];
    }
    return newLine;
}
function solveSuite(suite) {
    let allSuites = [suite];
    while (!allSuites[allSuites.length - 1].every((elem) => elem === 0)) {
        const subLine = guessSubLine(allSuites[allSuites.length - 1]);
        allSuites.push(subLine);
    }
    const reversedAllSuites = allSuites.reverse();
    let lastSuiteNumber = 0;
    const result = reversedAllSuites.reduce((acc, curr) => {
        const res = lastSuiteNumber + curr[curr.length - 1];
        lastSuiteNumber = res;
        return res;
    }, 0);
    return result;
}
const day9 = () => {
    const fileContent = fs.readFileSync("src/day9/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    const result = lines.reduce((acc, line) => {
        const suiteResult = solveSuite(line.split(" ").map((char) => parseInt(char)));
        return acc + suiteResult;
    }, 0);
    console.log(result);
};
exports.day9 = day9;

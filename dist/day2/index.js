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
exports.day2 = void 0;
const fs = __importStar(require("fs"));
const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;
const getColor = (set, color) => {
    const redregex = /(\d*) red/;
    const greenregex = /(\d*) green/;
    const blueregex = /(\d*) blue/;
    let regex = redregex;
    switch (color) {
        case "green":
            regex = greenregex;
            break;
        case "red":
            regex = redregex;
            break;
        case "blue":
            regex = blueregex;
            break;
    }
    const colorResult = set.match(regex);
    if (colorResult === null) {
        return 0;
    }
    return parseInt(colorResult[1]);
};
const isSetValid = (set) => {
    const blueCount = getColor(set, "blue");
    const redCount = getColor(set, "red");
    const greenCount = getColor(set, "green");
    if (blueCount <= MAX_BLUE_CUBES &&
        redCount <= MAX_RED_CUBES &&
        greenCount <= MAX_GREEN_CUBES) {
        return true;
    }
    return false;
};
const day2 = () => {
    const fileContent = fs.readFileSync("src/day2/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    const filteredLines = lines.filter((line) => {
        const [gameId, lineContent] = line.split(":");
        const sets = lineContent.split(";");
        const setsResult = sets.map((set) => {
            return isSetValid(set);
        });
        return setsResult.indexOf(false) === -1;
    });
    const sum = filteredLines.reduce((acc, curr) => {
        const regex = /Game (\d*):/;
        const matchResult = curr.match(regex);
        if (!matchResult) {
            return acc;
        }
        return acc + parseInt(matchResult[1]);
    }, 0);
    console.log(sum);
};
exports.day2 = day2;

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
const getSetValues = (set) => {
    const blue = getColor(set, "blue");
    const red = getColor(set, "red");
    const green = getColor(set, "green");
    return { blue, red, green };
};
const day2 = () => {
    const fileContent = fs.readFileSync("src/day2/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    const gamePower = lines.map((line) => {
        const [gameId, lineContent] = line.split(":");
        const sets = lineContent.split(";");
        const setsMinimumValues = sets.reduce((acc, set) => {
            const setValues = getSetValues(set);
            return {
                blue: acc.blue >= setValues.blue ? acc.blue : setValues.blue,
                green: acc.green >= setValues.green ? acc.green : setValues.green,
                red: acc.red >= setValues.red ? acc.red : setValues.red,
            };
        }, { red: 0, blue: 0, green: 0 });
        return (setsMinimumValues.blue * setsMinimumValues.green * setsMinimumValues.red);
    });
    const sum = gamePower.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    console.log(sum);
};
exports.day2 = day2;

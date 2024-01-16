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
exports.day8 = void 0;
const fs = __importStar(require("node:fs"));
function getPathInstructions(fileContent) {
    const lines = fileContent.split("\n");
    const pathInstructions = {};
    for (let index = 2; index < lines.length; index++) {
        const line = lines[index];
        Array.from(line.matchAll(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g)).forEach((value) => {
            pathInstructions[value[1]] = { key: value[1], L: value[2], R: value[3] };
        });
    }
    return pathInstructions;
}
function getPath(fileContent) {
    const path = fileContent.split("\n")[0];
    return [...path];
}
const day8 = () => {
    const fileContent = fs.readFileSync("src/day8/input.txt", {
        encoding: "utf8",
    });
    let directionIndex = 0;
    const path = getPath(fileContent);
    const pathInstructions = getPathInstructions(fileContent);
    let step = "AAA";
    let idx = 0;
    while (step !== "ZZZ") {
        idx = idx + 1;
        const instruction = path[directionIndex];
        const typedInstruction = instruction;
        const currentStep = pathInstructions[step];
        step = currentStep[typedInstruction];
        directionIndex =
            directionIndex === path.length - 1 ? 0 : directionIndex + 1;
    }
    console.log(idx);
};
exports.day8 = day8;

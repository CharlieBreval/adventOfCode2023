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
exports.day11 = void 0;
const fs = __importStar(require("node:fs"));
const _ = __importStar(require("lodash"));
function reverse(arrayToReverse) {
    const result = [];
    arrayToReverse.forEach((line, idxLine) => {
        [...line].forEach((char, idxCol) => {
            if (!result[idxCol]) {
                result[idxCol] = [];
            }
            result[idxCol][idxLine] = char;
        });
    });
    return result.reduce((acc, curr) => {
        return [...acc, curr.join('')];
    }, []);
}
function expand(arrayToExpand) {
    const result = arrayToExpand.reduce((acc, curr) => {
        if (!curr.match(/#/)) {
            return [...acc, curr, curr];
        }
        else {
            return [...acc, curr];
        }
    }, []);
    return result;
}
function expandGalaxies(fileContent) {
    const lines = fileContent.split('\n');
    const expandedGalaxies1 = expand(lines);
    const reversedGalaxies = reverse(expandedGalaxies1);
    const reversedExpandedGalaxies = expand(reversedGalaxies);
    const result = reverse(reversedExpandedGalaxies);
    fs.writeFileSync('src/day11/input-expanded.txt', result.join('\n'));
}
function getShortestPathBetween(galaxy1, galaxy2) {
    const diffY = Math.abs(galaxy1.y - galaxy2.y);
    const diffX = Math.abs(galaxy1.x - galaxy2.x);
    return diffX + diffY;
}
function day11() {
    var fileContent = fs.readFileSync("src/day11/input.txt", {
        encoding: "utf8",
    });
    expandGalaxies(fileContent);
    fileContent = fs.readFileSync("src/day11/input-expanded.txt", {
        encoding: "utf8",
    });
    let galaxyRepository = {};
    const lines = fileContent.split('\n');
    lines.forEach((line, lineNumber) => {
        const regexp = /(#)/g;
        const matches = [...line.matchAll(regexp)];
        matches.forEach((currMatch) => {
            const x = currMatch.index ? currMatch.index + 1 : 1;
            const y = lineNumber + 1;
            galaxyRepository[`${y}:${x}`] = { y, x, key: `${y}:${x}` };
        });
    });
    let scores = {};
    Object.keys(galaxyRepository).forEach((examinatedKey) => {
        Object.keys(galaxyRepository).forEach((currGalaxyKey) => {
            if (examinatedKey === currGalaxyKey) {
                return;
            }
            const galaxy1 = galaxyRepository[examinatedKey];
            const galaxy2 = galaxyRepository[currGalaxyKey];
            const currScore = getShortestPathBetween(galaxy1, galaxy2);
            if (!scores[galaxy1.key] && !scores[galaxy2.key]) {
                scores[galaxy1.key] = {
                    ...scores[galaxy1.key],
                    [galaxy2.key]: currScore
                };
            }
            else if (!scores[galaxy1.key] && scores[galaxy2.key]) {
                scores[galaxy2.key] = {
                    ...scores[galaxy2.key],
                    [galaxy1.key]: currScore
                };
            }
            else if (scores[galaxy1.key] && !scores[galaxy2.key]) {
                scores[galaxy1.key] = {
                    ...scores[galaxy1.key],
                    [galaxy2.key]: currScore
                };
            }
        });
    });
    const totalScore = _.reduce(scores, (acc, curr) => {
        let sum = 0;
        Object.keys(curr).forEach((key) => {
            const currSum = curr[key];
            sum = currSum + sum;
        });
        return acc + sum;
    }, 0);
    console.log(totalScore);
}
exports.day11 = day11;

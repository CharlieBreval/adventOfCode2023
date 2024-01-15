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
exports.day5 = void 0;
const fs = __importStar(require("node:fs"));
const _ = __importStar(require("lodash"));
function getSeeds(raw) {
    const firstRow = raw.split("\n")[0];
    const seedRanges = Array.from(firstRow.matchAll(/(\d+) (\d+)/g)).map((seed) => seed[0]);
    const seeds = seedRanges.reduce((acc, curr) => {
        const currRange = curr.split(" ");
        const start = Number(currRange[0]);
        const length = Number(currRange[1]);
        const end = start + length;
        const range = _.range(start - 1, end);
        return acc.concat(range);
    }, []);
    return seeds;
}
const rowHeaders = {
    0: "destination",
    1: "source",
    2: "length",
};
const mappersSuite = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
];
function getMappers(fileContent) {
    const lines = fileContent.split("\n");
    let mappers = {};
    let mapperNature = undefined;
    for (let index = 1; index < lines.length; index++) {
        const row = lines[index];
        if (row.indexOf("map") >= 0) {
            const rawMapper = row.match(/([a-z]*)-to-([a-z]*)/);
            if (rawMapper) {
                const formattedElem = `${rawMapper[1]}`;
                mappers[formattedElem] = [];
                mapperNature = formattedElem;
            }
        }
        else {
            if (mapperNature) {
                const formattedRow = row.split(" ").reduce((acc, curr, index) => {
                    return {
                        ...acc,
                        [rowHeaders[index]]: curr,
                    };
                }, { destination: 0, source: 0, length: 0 });
                mappers[mapperNature].push(formattedRow);
            }
        }
    }
    return mappers;
}
function getMappedValue(mapperType, mapperValues, value) {
    let foundValue = undefined;
    mapperValues.forEach((mapperValue) => {
        const rangeStart = mapperValue.source;
        const rangeEnd = Number(rangeStart) + Number(mapperValue.length);
        if (value >= rangeStart && value <= rangeEnd) {
            const diffFromRangeStart = value - rangeStart;
            const result = Number(mapperValue.destination) + Number(diffFromRangeStart);
            foundValue = result;
        }
    });
    if (foundValue === undefined) {
        foundValue = value;
    }
    return foundValue;
}
const day5 = () => {
    const fileContent = fs.readFileSync("src/day5/input.txt", {
        encoding: "utf8",
    });
    const seeds = getSeeds(fileContent);
    const mappers = getMappers(fileContent);
    const bestSeed = seeds.reduce((acc, seed, index) => {
        const percent = index * 100 / seeds.length;
        console.clear();
        console.log(`${percent}/100`);
        const seedResult = mappersSuite.reduce((seedAcc, currMapperType) => {
            const result = getMappedValue(currMapperType, mappers[currMapperType], seedAcc);
            return result;
        }, Number(seed));
        if (seedResult < acc) {
            return seedResult;
        }
        return acc;
    }, Infinity);
    console.log(bestSeed);
};
exports.day5 = day5;

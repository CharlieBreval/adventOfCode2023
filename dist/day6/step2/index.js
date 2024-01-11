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
exports.day6 = void 0;
const fs = __importStar(require("node:fs"));
const _ = __importStar(require("lodash"));
function getAttemptsByDuration(time) {
    const attemptsByLockedTime = _.range(0, time + 1);
    const attemptsWithScore = attemptsByLockedTime.map((lockedTime) => {
        const distance = lockedTime * (time - lockedTime);
        return {
            lockedTime,
            distance,
        };
    });
    return attemptsWithScore;
}
const day6 = () => {
    const fileContent = fs.readFileSync("src/day6/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.replaceAll(' ', '').split("\n");
    const timeLine = lines[0];
    const distanceLine = lines[1];
    const times = Array.from(timeLine.matchAll(/(\d+)/g)).map((time) => parseInt(time[0]));
    const distances = Array.from(distanceLine.matchAll(/(\d+)/g)).map((distance) => parseInt(distance[0]));
    let races = {};
    times.forEach((time, timeIdx) => {
        races[time] = distances[timeIdx];
    });
    const racesScore = Object.keys(races).map((time) => {
        const distance = races[parseInt(time)];
        const attemptsWithScore = getAttemptsByDuration(parseInt(time));
        const filteredAttemptsWithScore = attemptsWithScore.filter((attempt) => attempt.distance > distance);
        return filteredAttemptsWithScore.length;
    });
    const totalScore = racesScore.reduce((acc, curr) => {
        if (curr === 0) {
            return acc;
        }
        return acc * curr;
    }, 1);
    console.log(totalScore);
};
exports.day6 = day6;

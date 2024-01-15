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
exports.day7 = void 0;
const fs = __importStar(require("node:fs"));
const _ = __importStar(require("lodash"));
const mappingArray = {
    A: 100,
    K: 90,
    Q: 80,
    J: 70,
    T: 60,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
};
function getScore(cards) {
    const countBy = _.countBy(cards);
    if (Object.values(countBy).includes(5)) {
        return 70;
    }
    if (Object.values(countBy).includes(4)) {
        return 60;
    }
    if (Object.values(countBy).includes(3) &&
        Object.values(countBy).includes(2)) {
        return 50;
    }
    if (Object.values(countBy).includes(3)) {
        return 40;
    }
    if (Object.values(countBy).filter((countBy) => countBy === 2).length === 2) {
        return 30;
    }
    if (Object.values(countBy).filter((countBy) => countBy === 2).length === 1) {
        return 20;
    }
    return 10;
}
const day7 = () => {
    const fileContent = fs.readFileSync("src/day7/input.txt", {
        encoding: "utf8",
    });
    const lines = fileContent.split("\n");
    const gamesWithScore = lines.map((game) => {
        const [cards, bid] = game.split(" ");
        const score = getScore([...cards]);
        return {
            score: score,
            cards: [...cards],
            bid,
        };
    });
    const sortedGames = gamesWithScore.sort(function (a, b) {
        if (a.score !== b.score) {
            return a.score - b.score;
        }
        if (a.cards[0] !== b.cards[0]) {
            return mappingArray[a.cards[0]] - mappingArray[b.cards[0]];
        }
        if (a.cards[1] !== b.cards[1]) {
            return mappingArray[a.cards[1]] - mappingArray[b.cards[1]];
        }
        if (a.cards[2] !== b.cards[2]) {
            return mappingArray[a.cards[2]] - mappingArray[b.cards[2]];
        }
        if (a.cards[3] !== b.cards[3]) {
            return mappingArray[a.cards[3]] - mappingArray[b.cards[3]];
        }
        if (a.cards[4] !== b.cards[4]) {
            return mappingArray[a.cards[4]] - mappingArray[b.cards[4]];
        }
        return 0;
    });
    const sum = sortedGames.reduce((acc, curr, index) => {
        const handScore = (index + 1) * parseInt(curr.bid);
        return acc + handScore;
    }, 0);
    console.log(sum);
};
exports.day7 = day7;

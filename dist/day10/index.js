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
exports.day10 = void 0;
const fs = __importStar(require("node:fs"));
let map = [];
let animalPosition;
let lastMovement;
let nextMovement;
let currentSymbol;
let stepsCount = 0;
const movementMappings = {
    south: {
        J: "west",
        "|": "south",
        L: "east",
    },
    north: {
        F: "east",
        "|": "north",
        "7": "west",
    },
    east: { J: "north", "-": "east", "7": "south" },
    west: { F: "south", "-": "west", L: "north" },
};
function feedMap(fileContent) {
    const lines = fileContent.split("\n");
    lines.forEach((line, index) => {
        const lineAsArray = [...line];
        if (lineAsArray.includes("S")) {
            animalPosition = {
                x: lineAsArray.indexOf("S"),
                y: index,
            };
        }
        map.push(lineAsArray);
    });
}
function move() {
    switch (lastMovement) {
        case "east":
            animalPosition = {
                x: animalPosition.x + 1,
                y: animalPosition.y,
            };
            currentSymbol = map[animalPosition.y][animalPosition.x];
            break;
        case "west":
            animalPosition = {
                x: animalPosition.x - 1,
                y: animalPosition.y,
            };
            currentSymbol = map[animalPosition.y][animalPosition.x];
            break;
        case "south":
            animalPosition = {
                x: animalPosition.x,
                y: animalPosition.y + 1,
            };
            currentSymbol = map[animalPosition.y][animalPosition.x];
            break;
        case "north":
            animalPosition = {
                x: animalPosition.x,
                y: animalPosition.y - 1,
            };
            currentSymbol = map[animalPosition.y][animalPosition.x];
            break;
    }
    stepsCount = stepsCount + 1;
    const isNewPositionValid = isPositionValid();
    if (!isNewPositionValid) {
        throw new Error("Invalid position");
    }
    nextMovement = movementMappings[lastMovement][currentSymbol];
    lastMovement = nextMovement;
}
function isPositionValid() {
    if (currentSymbol === "S") {
        return true;
    }
    if (!Object.keys(movementMappings[lastMovement]).includes(currentSymbol)) {
        return false;
    }
    return true;
}
const day10 = () => {
    const fileContent = fs.readFileSync("src/day10/input.txt", {
        encoding: "utf8",
    });
    lastMovement = "west";
    feedMap(fileContent);
    do {
        console.log(lastMovement);
        move();
    } while (currentSymbol !== 'S');
    console.log(stepsCount);
};
exports.day10 = day10;

import * as fs from "node:fs";

type MSymbol = "F" | "J" | "|" | "-" | "." | "7" | "L" | "S";

let map: MSymbol[][] = [];
let animalPosition: {
  x: number;
  y: number;
};
let lastMovement: Direction;
let nextMovement: Direction;
let currentSymbol: MSymbol;
let stepsCount = 0;

const movementMappings: Record<
  Direction,
  Partial<Record<MSymbol, Direction>>
> = {
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

function feedMap(fileContent: string) {
  const lines = fileContent.split("\n");
  lines.forEach((line, index) => {
    const lineAsArray = [...line] as MSymbol[];
    if (lineAsArray.includes("S")) {
      animalPosition = {
        x: lineAsArray.indexOf("S"),
        y: index,
      };
    }
    map.push(lineAsArray);
  });
}

type Direction = "east" | "west" | "south" | "north";

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
  nextMovement = movementMappings[lastMovement][currentSymbol] as Direction;
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

export const day10 = () => {
  const fileContent = fs.readFileSync("src/day10/input.txt", {
    encoding: "utf8",
  });

  lastMovement = "west";
  feedMap(fileContent);
  

  do {
    console.log(lastMovement)
    move();
  } while (currentSymbol !== 'S');

  console.log(stepsCount)
};

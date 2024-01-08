import * as fs from "fs";

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

const getColor = (set: string, color: string) => {
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

const isSetValid = (set: string) => {
  const blueCount = getColor(set, "blue");
  const redCount = getColor(set, "red");
  const greenCount = getColor(set, "green");

  if (
    blueCount <= MAX_BLUE_CUBES &&
    redCount <= MAX_RED_CUBES &&
    greenCount <= MAX_GREEN_CUBES
  ) {
    return true;
  }

  return false;
};

export const day2 = () => {
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

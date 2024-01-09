import * as fs from "node:fs";
import * as _ from "lodash";

let treasureMap = _.range(1, 141).map(() => {
  return _.range(1, 141).map(() => ".");
});

function isSpecialChar(char: string) {
  return char.match(/[^a-zA-Z0-9|.]/);
}

function targetSpecialChar(
  treasureMap: string[][],
  indexLine: number,
  indexCol: number
) {
  treasureMap[indexLine - 1][indexCol - 1] = "T";
  treasureMap[indexLine - 1][indexCol] = "T";
  treasureMap[indexLine - 1][indexCol + 1] = "T";

  treasureMap[indexLine][indexCol - 1] = "T";
  treasureMap[indexLine][indexCol] = "T";
  treasureMap[indexLine][indexCol + 1] = "T";

  treasureMap[indexLine + 1][indexCol - 1] = "T";
  treasureMap[indexLine + 1][indexCol] = "T";
  treasureMap[indexLine + 1][indexCol + 1] = "T";
}

function writeTreasureMap() {
  const stringifiedLines = treasureMap.map((line) => line.join(""));
  const string = stringifiedLines.join("\n");
  fs.writeFileSync("src/day3/treasureMap.txt", string);
}

function isNumberValid(
  line: number,
  numberInLine: string,
  positionInLine: number
) {
  const result = [...numberInLine].map((number, index) => {
    const numberPosition = positionInLine + index;

    if (treasureMap[line - 1][numberPosition - 1] === "T") {
      return true;
    }

    return false;
  });
  return result.includes(true);
}

export const day3 = () => {
  const fileContent = fs.readFileSync("src/day3/input.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");
  lines.map((line, indexLine) => {
    [...line].forEach((lineChar, indexCol) => {
      if (isSpecialChar(lineChar)) {
        targetSpecialChar(treasureMap, indexLine, indexCol);
      }
    });
    return 0;
  });

  const sum = lines.reduce((acc, line, lineIdx) => {
    const regex = /(\d+)/g;
    const matchResult = line.matchAll(regex);
    const matchResultArray = Array.from(matchResult);

    const sumLine = matchResultArray.reduce((acc, result) => {
      const index = result["index"] || 0;
      if (isNumberValid(lineIdx + 1, result[0], index + 1)) {
        return acc + parseInt(result[0]);
      }

      return acc;
    }, 0);

    return acc + sumLine;
  }, 0);

  console.log(sum)
  writeTreasureMap();
};

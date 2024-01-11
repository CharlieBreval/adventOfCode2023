import * as fs from "node:fs";

export const day4 = () => {
  const fileContent = fs.readFileSync("src/day4/input.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");

  const result = lines.reduce((acc, curr) => {
    const matchResult = curr.matchAll(/^[^:]*: (.+)\| (.+)/g);
    const matchResultArray = Array.from(matchResult);

    if (matchResultArray.length === 0) {
      return acc;
    }

    const winningNumbers = matchResultArray[0][1]
      .split(" ")
      .filter((number) => number !== "")
      .map((number) => parseInt(number));

    const ourNumbers = matchResultArray[0][2]
      .split(" ")
      .filter((number) => number !== "")
      .map((number) => parseInt(number));

    const numberOfWinningNumberByLine = ourNumbers.reduce((acc1, curr1) => {
      if (winningNumbers.includes(curr1)) {
        return acc1 + 1;
      }

      return acc1;
    }, 0);

    return numberOfWinningNumberByLine > 0 ? acc + Math.pow(2, numberOfWinningNumberByLine - 1) : acc;
  }, 0);

  console.log(result);
};

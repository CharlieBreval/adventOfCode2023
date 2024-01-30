import * as fs from "node:fs";

type Suite = number[];

function guessSubLine(suite: Suite) {
  const newLine: Suite = [];
  let lastNumber = suite[0];
  for (let i = 1; i <= suite.length - 1; i++) {
    newLine.push(suite[i] - lastNumber);
    lastNumber = suite[i];
  }

  return newLine;
}

function solveSuite(suite: Suite) {
  let allSuites: Suite[] = [suite];

  while (!allSuites[allSuites.length - 1].every((elem) => elem === 0)) {
    const subLine = guessSubLine(allSuites[allSuites.length - 1]);
    allSuites.push(subLine);
  }

  const reversedAllSuites = allSuites.reverse();
  let lastSuiteNumber = 0;
  const result = reversedAllSuites.reduce((acc, curr) => {
    const res = lastSuiteNumber + curr[curr.length - 1];
    lastSuiteNumber = res;
    return res;
  }, 0);

  return result;
}

export const day9 = () => {
  const fileContent = fs.readFileSync("src/day9/input.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");
  const result = lines.reduce((acc, line) => {
    const suiteResult = solveSuite(
      line.split(" ").map((char) => parseInt(char))
    );

    return acc + suiteResult;
  }, 0);

  console.log(result);
};

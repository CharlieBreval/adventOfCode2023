import * as fs from "fs";

const findFirstAndLastDigit = (text: string) => {
  const regex = /(\d)/g;
  const result = text.match(regex);

  if (!result) {
    return null;
  }

  const firstDigit = result?.shift();
  const lastDigit = result.length > 0 ? result?.pop() : firstDigit;
  return {
    first: firstDigit,
    last: lastDigit,
  };
};

export const day1 = () => {
  const fileContent = fs.readFileSync("src/day1/example1.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");
  const sum = lines.reduce((acc, line) => {
    const firstAndLastDigit = findFirstAndLastDigit(line);
    const numberForLine = `${firstAndLastDigit?.first}${firstAndLastDigit?.last}`;
    if (!numberForLine) {
      return acc;
    }

    return parseInt(numberForLine, 10) + acc;
  }, 0);

  console.log(sum);
};

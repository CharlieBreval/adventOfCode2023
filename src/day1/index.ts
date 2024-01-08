import * as fs from "fs";

const mappingArray: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const mapStringToInt = (text: string) => {
  const keys = Object.keys(mappingArray);
  if (keys.includes(text)) {
    return mappingArray[text];
  }

  return parseInt(text);
};

const findFirstAndLastDigit = (text: string) => {
  const regex =
    /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g;
  const result = text.match(regex);

  if (!result) {
    return null;
  }

  const firstDigitRaw = result[0];
  const firstDigit = mapStringToInt(firstDigitRaw);

  const lastDigitRaw =
    result.length >= 2 ? result[result.length - 1] : firstDigit.toString();
  const lastDigit = mapStringToInt(lastDigitRaw);
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

    return parseInt(numberForLine) + acc;
  }, 0);

  console.log(sum);
};

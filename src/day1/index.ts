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
  const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
  const result = text.matchAll(regex);

  const resultArray = Array.from(result, (data) => {
    return data[1];
  });

  if (!resultArray) {
    return null;
  }

  const firstDigitRaw = resultArray[0];
  const firstDigit = mapStringToInt(firstDigitRaw);

  const lastDigitRaw =
  resultArray.length > 1 ? resultArray[resultArray.length - 1] : firstDigit.toString();
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
  let i = 1;
  const sum = lines.reduce((acc, line) => {
    const firstAndLastDigit = findFirstAndLastDigit(line);
    if (firstAndLastDigit === null) {
      return acc;
    }

    const numberForLine = `${firstAndLastDigit?.first}${firstAndLastDigit?.last}`;
    console.log(i);
    i++;
    console.log(numberForLine);

    return parseInt(numberForLine) + acc;
  }, 0);

  console.log(sum);
};

import * as fs from "fs";

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

const getSetValues = (set: string) => {
  const blue = getColor(set, "blue");
  const red = getColor(set, "red");
  const green = getColor(set, "green");

  return { blue, red, green };
};

export const day2 = () => {
  const fileContent = fs.readFileSync("src/day2/input.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");

  const gamePower = lines.map((line) => {
    const [gameId, lineContent] = line.split(":");
    const sets = lineContent.split(";");

    const setsMinimumValues = sets.reduce(
      (acc, set) => {
        const setValues = getSetValues(set);
        return {
          blue: acc.blue >= setValues.blue ? acc.blue : setValues.blue,
          green: acc.green >= setValues.green ? acc.green : setValues.green,
          red: acc.red >= setValues.red ? acc.red : setValues.red,
        };
      },
      { red: 0, blue: 0, green: 0 }
    );

    return (
      setsMinimumValues.blue * setsMinimumValues.green * setsMinimumValues.red
    );
  });

  const sum = gamePower.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  console.log(sum);
};

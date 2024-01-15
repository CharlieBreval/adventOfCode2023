import * as fs from "node:fs";
import * as _ from "lodash";

function getSeeds(raw: string) {
  const firstRow = raw.split("\n")[0];
  const seeds = Array.from(firstRow.matchAll(/(\d+)/g)).map((seed) => seed[0]);

  return seeds;
}

const rowHeaders: Record<number, string> = {
  0: "destination",
  1: "source",
  2: "length",
};

const mappersSuite = [
  "seed",
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
];

type Mappers = Record<
  string,
  { destination: number; source: number; length: number }[]
>;

function getMappers(fileContent: string) {
  const lines = fileContent.split("\n");
  let mappers: Mappers = {};

  let mapperNature: string | undefined = undefined;
  for (let index = 1; index < lines.length; index++) {
    const row = lines[index];
    if (row.indexOf("map") >= 0) {
      const rawMapper = row.match(/([a-z]*)-to-([a-z]*)/);
      if (rawMapper) {
        const formattedElem = `${rawMapper[1]}`;
        mappers[formattedElem] = [];
        mapperNature = formattedElem;
      }
    } else {
      if (mapperNature) {
        const formattedRow: {
          destination: number;
          source: number;
          length: number;
        } = row.split(" ").reduce(
          (acc, curr, index) => {
            return {
              ...acc,
              [rowHeaders[index]]: curr,
            };
          },
          { destination: 0, source: 0, length: 0 }
        );

        mappers[mapperNature].push(formattedRow);
      }
    }
  }

  return mappers;
}

function getMappedValue(
  mapperType: string,
  mapperValues: { destination: number; source: number; length: number }[],
  value: number
) {
  let foundValue = undefined;
  mapperValues.forEach((mapperValue) => {
    const rangeStart = mapperValue.source;
    const rangeEnd = Number(rangeStart) + Number(mapperValue.length);

    if (value >= rangeStart && value <= rangeEnd) {
      const diffFromRangeStart = value - rangeStart;
      const result =
        Number(mapperValue.destination) + Number(diffFromRangeStart);
      foundValue = result;
    }
  });

  if (foundValue === undefined) {
    foundValue = value;
  }

  return foundValue;
}

export const day5 = () => {
  const fileContent = fs.readFileSync("src/day5/input.txt", {
    encoding: "utf8",
  });

  const seeds = getSeeds(fileContent);
  const mappers = getMappers(fileContent);

  const bestSeed = seeds.reduce((acc, seed) => {
    const seedResult = mappersSuite.reduce((seedAcc, currMapperType) => {
      const result = getMappedValue(
        currMapperType,
        mappers[currMapperType],
        seedAcc
      );

      return result;
    }, Number(seed));

    if (seedResult < acc) {
      return seedResult;
    }

    return acc;
  }, Infinity);

  console.log(bestSeed)
};

import * as fs from "node:fs";
import * as _ from "lodash";

type LR = "R" | "L";

function getPathInstructions(fileContent: string) {
  const lines = fileContent.split("\n");
  const pathInstructions: Record<
    string,
    { key: string; L: string; R: string }
  > = {};
  for (let index = 2; index < lines.length; index++) {
    const line = lines[index];

    Array.from(
      line.matchAll(/([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g)
    ).forEach((value) => {
      pathInstructions[value[1]] = { key: value[1], L: value[2], R: value[3] };
    });
  }

  return pathInstructions;
}

function getPath(fileContent: string) {
  const path = fileContent.split("\n")[0];
  return [...path] as LR[];
}

export const day8 = () => {
  const fileContent = fs.readFileSync("src/day8/input.txt", {
    encoding: "utf8",
  });
  let directionIndex = 0;

  const path = getPath(fileContent);
  const pathInstructions = getPathInstructions(fileContent);

  let step = "AAA";
  let idx = 0;

  while (step !== "ZZZ") {
    idx = idx + 1;
    const instruction = path[directionIndex];
    const typedInstruction = instruction;
    const currentStep = pathInstructions[step];
    step = currentStep[typedInstruction];
    directionIndex =
      directionIndex === path.length - 1 ? 0 : directionIndex + 1;
  }

  console.log(idx);
};

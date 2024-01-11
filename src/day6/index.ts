import * as fs from "node:fs";
import * as _ from "lodash";

function getAttemptsByDuration(time: number) {
  const attemptsByLockedTime = _.range(0, time + 1);
  const attemptsWithScore = attemptsByLockedTime.map((lockedTime) => {
    const distance = lockedTime * (time - lockedTime);
    return {
      lockedTime,
      distance,
    };
  });

  return attemptsWithScore;
}

export const day6 = () => {
  const fileContent = fs.readFileSync("src/day6/input.txt", {
    encoding: "utf8",
  });

  const lines = fileContent.split("\n");

  const timeLine = lines[0];
  const distanceLine = lines[1];

  const times = Array.from(timeLine.matchAll(/(\d+)/g)).map((time) =>
    parseInt(time[0])
  );
  const distances = Array.from(distanceLine.matchAll(/(\d+)/g)).map(
    (distance) => parseInt(distance[0])
  );

  let races: Record<number, number> = {};
  times.forEach((time, timeIdx) => {
    races[time] = distances[timeIdx];
  });

  const racesScore = Object.keys(races).map((time) => {
    const distance = races[parseInt(time)];
    const attemptsWithScore = getAttemptsByDuration(parseInt(time));

    const filteredAttemptsWithScore = attemptsWithScore.filter(
      (attempt) => attempt.distance > distance
    );

    return filteredAttemptsWithScore.length;
  });

  const totalScore = racesScore.reduce((acc, curr) => {
    if (curr === 0) {
      return acc;
    }
    return acc * curr;
  }, 1);

  console.log(totalScore);
};

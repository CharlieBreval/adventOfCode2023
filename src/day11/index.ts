import * as fs from "node:fs";
import * as _ from "lodash";

function reverse(arrayToReverse: string[]): string[] {
    const result: ([string] | [])[] = [];
    arrayToReverse.forEach((line, idxLine) => {
        [...line].forEach((char, idxCol) => {
            if (!result[idxCol]) {
                result[idxCol] = [];
            }
            result[idxCol][idxLine] = char;
        })
    })

    return result.reduce<string[]>((acc, curr) => {
        return [...acc, curr.join('')]
    }, [])
}

function expand(arrayToExpand: string[]): string[] {
    const result = arrayToExpand.reduce<string[]>((acc, curr) => {
        if (!curr.match(/#/)) {
            return [...acc, curr, curr];
        } else {
            return [...acc, curr]
        }
    }, []);

    return result;
}

function expandGalaxies(fileContent: string) {
    const lines = fileContent.split('\n');

    const expandedGalaxies1 = expand(lines);
    const reversedGalaxies = reverse(expandedGalaxies1);
    const reversedExpandedGalaxies = expand(reversedGalaxies);
    const result = reverse(reversedExpandedGalaxies);

    fs.writeFileSync('src/day11/input-expanded.txt', result.join('\n'));

}

function getShortestPathBetween(galaxy1: Galaxy, galaxy2: Galaxy) {

    const diffY = Math.abs(galaxy1.y - galaxy2.y);
    const diffX = Math.abs(galaxy1.x - galaxy2.x);
    
    return  diffX + diffY;
}

type Galaxy = {
    x: number,
    y: number,
    key: string
}

function sortGalaxies(galaxy1: Galaxy, galaxy2: Galaxy) {
    if (galaxy1.y < galaxy2.y) {
        return [galaxy1, galaxy2]
    }
}

export function day11() {
    var fileContent = fs.readFileSync("src/day11/input.txt", {
        encoding: "utf8",
    });


    expandGalaxies(fileContent);

    fileContent = fs.readFileSync("src/day11/input-expanded.txt", {
        encoding: "utf8",
    });

    let galaxyRepository: Record<string, Galaxy> = {};

    const lines = fileContent.split('\n');
    lines.forEach((line, lineNumber) => {
        const regexp = /(#)/g;
        const matches = [...line.matchAll(regexp)];
        matches.forEach((currMatch) => {
            const x = currMatch.index ? currMatch.index + 1 : 1;
            const y = lineNumber + 1;
            galaxyRepository[`${y}:${x}`] = { y, x, key: `${y}:${x}` }
        })
    })

    let scores: Record<string, Record<string, number>> = {}
    Object.keys(galaxyRepository).forEach((examinatedKey) => {
        Object.keys(galaxyRepository).forEach((currGalaxyKey) => {
            if (examinatedKey === currGalaxyKey) {
                return;
            }

            const galaxy1 = galaxyRepository[examinatedKey];
            const galaxy2 = galaxyRepository[currGalaxyKey];

            const currScore = getShortestPathBetween(galaxy1, galaxy2);

            
        })
    })

    const totalScore = _.reduce(scores, (acc, curr) => {
        let sum = 0;
        Object.keys(curr).forEach((key) => {
            const currSum = curr[key];
            sum = currSum + sum;
        })
        return acc + sum;
    }, 0)

    console.log(totalScore);
}

import path from 'path';
import { loadCsv } from '@shared/loadCsv';

const filePath = 'input.csv';

async function main() {
  console.log('Hello, Day 1!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = await loadCsv(relativePath);

  let idListOne: number[] = [];
  let idListTwo: number[] = [];
  let listTwoCount: Record<number, number> = {};

  for await (const line of input) {
    const [first, second] = handleLine(line);
    idListOne.push(first);
    idListTwo.push(second);

    // Count for part 2
    listTwoCount[second] = (listTwoCount[second] || 0) + 1;
  }

  solvePart1(idListOne, idListTwo);
  solvePart2(idListOne, listTwoCount);
}

function solvePart1(idListOne: number[], idListTwo: number[]) {
  const sortedIdListOne = idListOne.sort((a, b) => a - b);
  const sortedIdListTwo = idListTwo.sort((a, b) => a - b);

  let total = 0;

  for (let i = 0; i < sortedIdListOne.length; i++) {
    let diff = sortedIdListOne[i] - sortedIdListTwo[i];

    if (diff < 0) {
      diff = diff * -1;
    }

    total += diff;
  }

  console.log('Part 1 Total:', total);
}

function solvePart2(idListOne: number[], listTwoCount: Record<number, number>) {
  let total = 0;

  for (let i = 0; i < idListOne.length; i++) {
    const currentId = idListOne[i];
    const count = listTwoCount[currentId];

    if (count !== undefined) {
      total += currentId * count;
    }
  }

  console.log('Part 2 Total:', total);
}

function handleLine(line: string) {
  const [first, second] = line.split(/\s+/).map(Number);
  return [first, second];
}

main();

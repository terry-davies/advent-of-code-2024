import path from 'path';
import { loadInput } from '@shared/loadInput';
import { validateLine } from './validateLine';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 2!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = await loadInput(relativePath);

  let countPart1 = 0;
  let countPart2 = 0;

  const unsafe: number[][] = [];

  for await (const line of input) {
    const report = line.split(/\s+/).map(Number);
    const statusPart1 = validateLine(report);

    if (!statusPart1) {
      unsafe.push(report);
    }

    if (statusPart1) {
      countPart1++;
    }
  }

  for (let i = 0; i < unsafe.length; i++) {
    //console.log('unsafe:', unsafe[i]);
    const isSafe = unsafe[i].some((number, index) => {
      const modifiedReport = [
        ...unsafe[i].slice(0, index),
        ...unsafe[i].slice(index + 1),
      ];

      const isModifiedSafe = validateLine(modifiedReport);

      return isModifiedSafe;
    });

    if (isSafe) {
      countPart2++;
    }
  }

  console.log('Result Part 1:', countPart1);
  console.log('Result Part 2:', countPart2 + countPart1);
}

main();

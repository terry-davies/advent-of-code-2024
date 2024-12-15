import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { parseInput, processPart1, processPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 14!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const parsedInput = parseInput(input);

  const total = processPart1(parsedInput, 103, 101, 100);

  const part2 = processPart2(parsedInput, 103, 101);

  console.log('Result part 1: ', total);
  console.log('Result part 1: ', part2);
}

main();

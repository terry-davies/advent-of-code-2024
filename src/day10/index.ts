import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { parseInput, processPart1, processPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 10!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const parsedInput = parseInput(input);

  const total = processPart1(parsedInput);
  const total2 = processPart2(parsedInput);

  console.log('Result part 1: ', total);
  console.log('Result part 2: ', total2);
}

main();

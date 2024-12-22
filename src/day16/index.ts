import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { parseInput, processPart1, processPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 16!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const parsedInput = parseInput(input);

  const total = processPart1(parsedInput);

  const parsedInputPart2 = parseInput(input, true);

  const total2 = processPart2(parsedInputPart2);

  console.log('Result part 1: ', total);
  console.log('Result part 2: ', total2);
}

main();
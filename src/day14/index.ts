import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { parseInput, processPart1 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 14!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const parsedInput = parseInput(input);

  const total = processPart1(parsedInput, 103, 101, 100);

  console.log('Result part 1: ', total);
}

main();

import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { parseInput, processPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 9!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const parsedInput = parseInput(input);

  const total = processPart2(parsedInput);

  console.log('Result part 2: ', total);
}

main();

import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processStringPart1 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 7!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const { totalPart1, totalPart2 } = processStringPart1(input);

  console.log('Result part 1: ', totalPart1);
  console.log('Result part 2: ', totalPart2);
}

main();

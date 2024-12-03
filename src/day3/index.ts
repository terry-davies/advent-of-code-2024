import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processStringPart1, processStringPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 3!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  console.log('Part 1 Result:', processStringPart1(input));
  console.log('Part 2 Result:', processStringPart2(input));
}

main();

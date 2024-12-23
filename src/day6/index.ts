import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processStringPart1 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 6!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const total = processStringPart1(input);

  console.log('Result part 1: ', total);
}

main();

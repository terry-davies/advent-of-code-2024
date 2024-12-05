import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processStringPart1 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 5!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  console.log('Result part 1: ', processStringPart1(input));
}

main();

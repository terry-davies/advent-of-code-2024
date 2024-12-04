import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processString } from './helpers';
//import { processStringPart1, processStringPart2 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 4!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  console.log('Result part 1: ', processString(input));
}

main();

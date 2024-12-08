import path from 'path';
import { fetchFileContent } from '@shared/loadInput';
import { processPart1 } from './helpers';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 8!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = fetchFileContent(relativePath);

  const { part1, part2 } = processPart1(input);

  console.log('Result part 1: ', part1);
  console.log('Result part 2: ', part2);
}

main();

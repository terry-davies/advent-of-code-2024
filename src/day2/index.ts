import path from 'path';
import { loadInput } from '@shared/loadInput';
import { validateLine } from './validateLine';

const filePath = 'input.txt';

async function main() {
  console.log('Hello, Day 2!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = await loadInput(relativePath);

  let count = 0;

  for await (const line of input) {
    const status = validateLine(line);

    console.log('Line:', line, 'Status:', status);

    if (status) {
      count++;
    }
  }

  console.log('Result:', count);
}

main();

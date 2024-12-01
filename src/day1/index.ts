import path from 'path';
import { loadCsv } from '@shared/loadCsv';

const filePath = 'input.csv';

async function main() {
  console.log('Hello, Day 1!');

  const relativePath = path.resolve(__dirname, filePath);

  const input = await loadCsv(relativePath);

  let idListOne: number[] = [];
  let idListTwo: number[] = [];

  for await (const line of input) {
    const [first, second] = handleLine(line);
    idListOne.push(first);
    idListTwo.push(second);
  }

  idListOne = idListOne.sort((a, b) => a - b);
  idListTwo = idListTwo.sort((a, b) => a - b);

  let total = 0;

  for (let i = 0; i < idListOne.length; i++) {
    let diff = idListOne[i] - idListTwo[i];

    if (diff < 0) {
      diff = diff * -1;
    }

    total += diff;
  }

  console.log('Total:', total);
}

function handleLine(line: string) {
  const [first, second] = line.split(/\s+/).map(Number);
  return [first, second];
}

main();

import { ByteLengthQueuingStrategy } from 'stream/web';

export function validateLine(line: string): boolean {
  const report = line.split(/\s+/).map(Number);

  let result = true;
  let order: 'asc' | 'desc' | null = null;

  while (true) {
    const first = report.shift();

    if (first === undefined) {
      break;
    }

    if (report.length === 0) {
      break;
    }

    if (first === report[0]) {
      result = false;
      break;
    }

    if (order === null) {
      if (first < report[0]) {
        order = 'asc';
      } else {
        order = 'desc';
      }
    }

    if (order === 'asc') {
      if (first > report[0]) {
        result = false;
        break;
      }
    }

    if (order === 'desc') {
      if (first < report[0]) {
        result = false;
        break;
      }
    }

    if (!comparePair(first, report[0])) {
      result = false;
      break;
    }
  }

  return result;
}

function comparePair(first: number, last: number): boolean {
  const diff = Math.abs(first - last);

  return diff >= 1 && diff <= 3;
}

export function parseInput(input: string): {
  peaks: [number, number][];
  map: number[][];
} {
  const peaks: [number, number][] = [];
  const map = input.split('\n').map((line, lineIndex) =>
    line.split('').map((col, colIndex) => {
      const digit = Number(col);
      if (digit === 9) {
        peaks.push([lineIndex, colIndex]);
      }
      return digit;
    }),
  );

  return { peaks, map };
}

export function processPart1(input: {
  peaks: [number, number][];
  map: number[][];
}): number {
  let count = 0;

  for (const peak of input.peaks) {
    let result = walk(input.map, peak);
    if (result) {
      count++;
    }
  }

  return 0;
}

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function walk(map: number[][], peak: [number, number]) {
  const height = map.length;
  const width = map[0].length;

  let result = false;

  while (!result) {
    let nextDirections = [peak];
    const tempNextStep = [];
    for (const direction of directions) {
      for (const current of nextDirections) {
        const [x, y] = direction;
        const next: [number, number] = [current[0] + y, current[1] + x];

        if (
          next[0] < 0 ||
          next[0] >= height ||
          next[1] < 0 ||
          next[1] >= width
        ) {
          continue;
        }

        const currentVal = map[current[0]][current[1]];
        const nextVal = map[next[0]][next[1]];

        if (nextVal === 0) {
          result = true;
          break;
        }

        if (nextVal === currentVal - 1) {
          console.log('current', current, 'next', next);
          tempNextStep.push(next);
        }
      }

      nextDirections = tempNextStep;
    }
  }

  return result;
}

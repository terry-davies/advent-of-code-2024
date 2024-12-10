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
    count += result;
  }

  return count;
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

  let foundTrails = new Set<string>();

  const isValid = (next: [number, number]) => {
    const [x, y] = next;
    const gradient = map[x][y];

    if (gradient === 0) {
      foundTrails.add(`${next[0]}-${next[1]}`);
      return;
    }

    const validDirections = directions
      .map(([dx, dy]) => {
        return [x + dx, y + dy] as [number, number];
      })
      .filter(([x, y]) => {
        return (
          x >= 0 &&
          x < height &&
          y >= 0 &&
          y < width &&
          map[x][y] === gradient - 1
        );
      });

    validDirections.forEach((next) => {
      isValid(next);
    });
  };

  isValid(peak);

  return foundTrails.size;
}

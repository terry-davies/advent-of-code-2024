export function parseInput(input: string) {
  return input.split('\n').map((line) => line.split(''));
}

export function processPart1(input: string[][]): number {
  const visited = new Set<string>();
  let count = 0;
  let fences = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const key = `${i},${j}`;

      if (visited.has(key)) {
        continue;
      }

      const result = walkFence(input, [i, j], visited);

      count += result.currentTotal * result.currentFences;
    }
  }

  return count;
}

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function walkFence(
  grid: string[][],
  start: [number, number],
  visited: Set<string>,
) {
  const startLetter = grid[start[0]][start[1]];
  const height = grid.length;
  const width = grid[0].length;

  let currentTotal = 0;
  let currentFences = 0;

  const walk = (grid: string[][], start: [number, number]) => {
    const key = `${start[0]},${start[1]}`;

    if (visited.has(key)) {
      return { currentTotal, currentFences };
    }

    visited.add(key);

    const validDirections = directions
      .map(([dx, dy]) => {
        return [start[0] + dx, start[1] + dy] as [number, number];
      })
      .filter(([x, y]) => {
        return x >= 0 && x < height && y >= 0 && y < width;
      })
      .filter(([x, y]) => {
        return grid[x][y] === startLetter;
      });

    currentTotal++;
    currentFences += 4 - validDirections.length;

    if (!validDirections.length) {
      return { currentTotal, currentFences };
    }

    validDirections.forEach((direction) => {
      walk(grid, direction);
    });
  };

  walk(grid, start);

  return { currentTotal, currentFences };
}

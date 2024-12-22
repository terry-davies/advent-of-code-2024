export function parseInput(input: string) {
  const grid = input.split('\n').map((row) => row.split(''));

  let start: [number, number] = [0, 0];
  let end: [number, number] = [0, 0];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 'S') {
        start = [row, col];
      }
      if (grid[row][col] === 'E') {
        end = [row, col];
      }
    }
  }

  return {
    grid,
    start,
    end,
  };
}

type Input = ReturnType<typeof parseInput>;

const dirs = [
  [1, 0], //UP
  [0, 1], //RIGHT
  [-1, 0], //DOWN
  [0, -1], //LEFT
];

export function processPart1(input: Input): number {
  console.log(input);

  const route = walk(input.grid, input.start, input.end);

  return route
    .flatMap((_, index, r) => findCheat(r, index, 2))
    .reduce((acc, timeSaved) => (timeSaved >= 100 ? acc + 1 : acc), 0);
}

function walk(
  grid: string[][],
  start: [number, number],
  end: [number, number],
): [number, number][] | null {
  const stack: [number, number][] = [start];
  const visited = new Set<string>();
  const parent = new Map<string, [number, number]>();

  while (stack.length > 0) {
    const current = stack.pop()!;
    const [row, col] = current;
    const key = `${row},${col}`;

    if (row === end[0] && col === end[1]) {
      const path: [number, number][] = [];

      let currentPos: [number, number] = [row, col];

      while (currentPos) {
        path.unshift(currentPos);
        currentPos = parent.get(`${currentPos[0]},${currentPos[1]}`)!;
      }
      return path;
    }

    if (!visited.has(key)) {
      visited.add(key);

      for (const [dx, dy] of dirs) {
        const nextRow = row + dx;
        const nextCol = col + dy;
        const nextKey = `${nextRow},${nextCol}`;

        if (
          nextRow >= 0 &&
          nextRow < grid.length &&
          nextCol >= 0 &&
          nextCol < grid[0].length &&
          grid[nextRow][nextCol] !== '#' &&
          !visited.has(nextKey)
        ) {
          stack.push([nextRow, nextCol]);
          parent.set(nextKey, current);
        }
      }
    }
  }

  return null;
}

function findCheat(route: [number, number][], at: number, duration: number) {
  const saved = [];

  for (let i = at + 1; i < route.length; ++i) {
    const current = route[at];
    const next = route[i];

    const dist =
      Math.abs(current[0] - next[0]) + Math.abs(current[1] - next[1]);

    const distanceSaved = i - at - dist;

    if (dist <= duration && distanceSaved > 0) {
      saved.push(distanceSaved);
    }
  }
  return saved;
}

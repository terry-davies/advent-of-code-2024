type PuzzleInput = {
  grid: string[][];
  start: [number, number];
  end: [number, number];
};

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export function parseInput(input: string, isPart2 = false): PuzzleInput {
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

export function processPart2(input: PuzzleInput): number {
  return 0;
}

const walk = (grid: string[][], start: number[], end: number[]) => {
  let score = 0;

  const queue: [number, number, number, number][] = [
    [start[0], start[1], 1, 0],
  ];

  const visited = new Set<string>();

  while (queue.length) {
    queue.sort((a, b) => a[3] - b[3]);

    const [x, y, dir, score] = queue.shift()!;
    const key = `${x}-${y}-${dir}}`;

    if (x === end[0] && y === end[1]) return score;
    if (visited.has(key)) continue;

    visited.add(key);

    const nx = x + directions[dir][0];
    const ny = y + directions[dir][1];

    if (grid[ny]?.[nx] !== '#') {
      queue.push([nx, ny, dir, score + 1]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000]);
    queue.push([x, y, (dir + 3) % 4, score + 1000]);
  }

  return score;
};

//148628 high
//138628 low

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

interface Coord {
  x: number;
  y: number;
}

function getKey(c: Coord, dir: number) {
  return `${c.x},${c.y},${dir}`;
}

const getScore = (grid: string[][], start: Coord, end: Coord) => {
  let score = 0;

  const queue: [number, number, number, number][] = [[start.x, start.y, 1, 0]];
  const visited = new Set<string>();

  while (queue.length) {
    // Poor man's priority queue / Dijkstra's algorithm
    queue.sort((a, b) => a[3] - b[3]);

    const [x, y, dir, score] = queue.shift()!;
    const key = getKey({ x, y }, dir);

    if (x === end.x && y === end.y) return score;
    if (visited.has(key)) continue;

    visited.add(key);

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== '#') {
      queue.push([nx, ny, dir, score + 1]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000]);
    queue.push([x, y, (dir + 3) % 4, score + 1000]);
  }

  return score;
};

export function processPart1(input: PuzzleInput): number {
  const { start, end, grid } = input;

  const score = getScore(
    grid,
    { x: start[0], y: start[1] },
    { x: end[0], y: end[1] },
  );

  return score;
}

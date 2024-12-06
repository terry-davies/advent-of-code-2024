const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

function getGrid(input: string) {
  let start: null | [number, number] = null;

  const grid = input.split('\n').map((line, index) => {
    const row = line.split('');

    if (!start) {
      const foundIndex = row.findIndex((cell) => cell === '^');

      if (foundIndex !== -1) {
        start = [index, foundIndex];
      }
    }

    return row;
  });

  return { grid, start };
}

const isWithinGrid = (grid: string[][], cell: [number, number]) =>
  cell[0] >= 0 &&
  cell[0] < grid.length &&
  cell[1] >= 0 &&
  cell[1] < grid[0].length;

export function processStringPart1(input: string): {
  part1: number;
  part2: number;
} {
  let { grid, start } = getGrid(input);

  let current = start;
  let directionIndex = 0;
  let currentDirection = directions[directionIndex];

  const updateDirection = () => {
    directionIndex = directionIndex === 3 ? 0 : directionIndex + 1;
    currentDirection = directions[directionIndex];
  };

  const touchedCells = new Set();
  const simulatedCells = new Set();
  let part2 = 0;

  while (true) {
    touchedCells.add(current.join(','));

    let next: [number, number] = [
      current[0] + currentDirection[0],
      current[1] + currentDirection[1],
    ];

    if (!isWithinGrid(grid, next)) {
      break;
    }

    if (grid[next[0]][next[1]] === '#') {
      updateDirection();
    } else {
      const isLoop = simulateObstruction(input, next);

      const key = `${next[0]},${next[1]}`;

      if (isLoop && !simulatedCells.has(key)) {
        simulatedCells.add(key);
        part2++;
      }

      current = next;
    }
  }

  return { part1: touchedCells.size, part2 };
}

function simulateObstruction(input: string, obstacleCell: [number, number]) {
  const { grid, start } = getGrid(input);

  let current = start;
  let directionIndex = 0;
  let currentDirection = directions[directionIndex];

  let nextObstacle: [number, number] = [obstacleCell[0], obstacleCell[1]];

  if (grid[nextObstacle[0]][nextObstacle[1]] !== '^') {
    grid[nextObstacle[0]][nextObstacle[1]] = '#';
  } else {
    console.log('found start');
    return false;
  }

  const touchedCells = new Set<string>();

  const updateDirection = () => {
    directionIndex = directionIndex === 3 ? 0 : directionIndex + 1;
    currentDirection = directions[directionIndex];
  };

  let isLoop = false;

  while (true) {
    const key = `${current[0]},${current[1]},${currentDirection[0]},${currentDirection[1]}`;

    if (touchedCells.has(key)) {
      isLoop = true;
      break;
    }

    touchedCells.add(key);

    let next: [number, number] = [
      current[0] + currentDirection[0],
      current[1] + currentDirection[1],
    ];

    if (!isWithinGrid(grid, next)) {
      break;
    }

    if (grid[next[0]][next[1]] === '#') {
      updateDirection();
    } else {
      current = next;
    }
  }

  return isLoop;
}

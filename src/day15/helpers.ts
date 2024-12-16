import { get } from 'http';

type PuzzleInput = {
  grid: string[][];
  instructions: (keyof typeof directionsMap)[];
};

const directionsMap = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

export function parseInput(input: string, isPart2 = false): PuzzleInput {
  const [grid, instructions] = input.split('\n\n');

  let mappedGrid: string[][] = [];

  if (!isPart2) {
    mappedGrid = grid.split('\n').map((row) => row.split(''));
  } else {
    mappedGrid = grid.split('\n').map((rowString) => {
      return rowString.split('').flatMap((char) => {
        if (char === 'O') {
          return ['[', ']'];
        }

        if (char === '@') {
          return ['@', '.'];
        }

        return [char, char];
      });
    });
  }

  return {
    grid: mappedGrid,
    instructions: instructions
      .split('\n')
      .flatMap(
        (instruction) =>
          instruction.split('') as (keyof typeof directionsMap)[],
      ),
  };
}

export function processPart2(input: PuzzleInput): number {
  let currentPosition = input.grid.reduce(
    (acc, row, x) => {
      const y = row.indexOf('@');
      return y !== -1 ? [x, y] : acc;
    },
    [-1, -1],
  );

  while (input.instructions.length) {
    const instruction = input.instructions.shift();

    currentPosition = movePart2(currentPosition, instruction, input.grid);
  }

  return input.grid.reduce((acc, row, rowIndex) => {
    const rowTotal = row
      .map((cell, index) => (cell === '[' ? index : null))
      .filter((x) => x !== null)
      .reduce((acc, x) => {
        const cellTotal = rowIndex * 100 + x;
        return cellTotal + acc;
      }, 0);

    return rowTotal + acc;
  }, 0);
}

export function processPart1(input: PuzzleInput): number {
  let currentPosition = input.grid.reduce(
    (acc, row, x) => {
      const y = row.indexOf('@');
      return y !== -1 ? [x, y] : acc;
    },
    [-1, -1],
  );

  while (input.instructions.length) {
    const instruction = input.instructions.shift();

    currentPosition = move(currentPosition, instruction, input.grid);
  }

  return input.grid.reduce((acc, row, rowIndex) => {
    const rowTotal = row
      .map((cell, index) => (cell === 'O' ? index : null))
      .filter((x) => x !== null)
      .reduce((acc, x) => {
        const cellTotal = rowIndex * 100 + x;
        return cellTotal + acc;
      }, 0);

    return rowTotal + acc;
  }, 0);
}

function move(
  currentPosition: number[],
  instruction: keyof typeof directionsMap,
  grid: string[][],
): number[] {
  const [x, y] = currentPosition;
  const [dx, dy] = directionsMap[instruction];

  let newPosition = [x + dx, y + dy];

  if (grid[newPosition[0]][newPosition[1]] === '#') {
    return currentPosition;
  }

  if (grid[newPosition[0]][newPosition[1]] === '.') {
    grid[x][y] = '.';
    grid[newPosition[0]][newPosition[1]] = '@';
    return newPosition;
  }

  let blocksToChange: string[] = [];
  let pathPosition = [newPosition[0], newPosition[1]];

  while (true) {
    if (grid[pathPosition[0]][pathPosition[1]] === 'O') {
      blocksToChange.push('O');
    }

    if (grid[pathPosition[0]][pathPosition[1]] === '.') {
      blocksToChange.push('.');
      break;
    }

    if (grid[pathPosition[0]][pathPosition[1]] === '#') {
      break;
    }

    pathPosition = [pathPosition[0] + dx, pathPosition[1] + dy];
  }

  const orderedBlocks = blocksToChange.sort((a, b) => a.localeCompare(b));

  const lastDotIndex = orderedBlocks.lastIndexOf('.');

  let newCurrentPosition = [x, y];

  orderedBlocks.forEach((char, index) => {
    const nextPosition = [
      Math.abs(newPosition[0] + dx * index),
      Math.abs(newPosition[1] + dy * index),
    ];

    if (index === lastDotIndex) {
      newCurrentPosition = nextPosition;
      grid[currentPosition[0]][currentPosition[1]] = '.';
      grid[nextPosition[0]][nextPosition[1]] = '@';
    } else {
      grid[nextPosition[0]][nextPosition[1]] = char;
    }
  });

  return newCurrentPosition;
}

function movePart2(
  currentPosition: number[],
  instruction: keyof typeof directionsMap,
  grid: string[][],
): number[] {
  const [x, y] = currentPosition;
  const [dx, dy] = directionsMap[instruction];

  let newPosition = [x + dx, y + dy];

  if (grid[newPosition[0]][newPosition[1]] === '#') {
    return currentPosition;
  }

  if (grid[newPosition[0]][newPosition[1]] === '.') {
    grid[x][y] = '.';
    grid[newPosition[0]][newPosition[1]] = '@';
    return newPosition;
  }

  let pathPosition = [newPosition[0], newPosition[1]];
  let blocksToChange: number[][] = [];
  let shouldChange = true;
  let changeCache = new Set<string>();

  const getBlocksToMove = (pos: number[]) => {
    if (changeCache.has(pos.join(''))) {
      return;
    }

    changeCache.add(pos.join(''));

    if (
      pos[0] < 0 ||
      pos[1] < 0 ||
      pos[0] >= grid.length ||
      pos[1] >= grid[0].length
    ) {
      shouldChange = false;
      return;
    }

    if (grid[pos[0]][pos[1]] === '[') {
      blocksToChange.push(pos);

      if (dx === 0) {
        getBlocksToMove([pos[0] + dx, pos[1] + dy]);
      } else {
        getBlocksToMove([pos[0], pos[1] + 1]);
        getBlocksToMove([pos[0] + dx, pos[1] + dy]);
      }
    }

    if (grid[pos[0]][pos[1]] === ']') {
      blocksToChange.push(pos);

      if (dx === 0) {
        getBlocksToMove([pos[0] + dx, pos[1] + dy]);
      } else {
        getBlocksToMove([pos[0] + dx, pos[1] + dy]);
        getBlocksToMove([pos[0], pos[1] - 1]);
      }
    }

    if (grid[pos[0]][pos[1]] === '#') {
      shouldChange = false;
      return;
    }

    return;
  };

  getBlocksToMove(pathPosition);

  if (shouldChange) {
    grid[x][y] = '.';

    blocksToChange = blocksToChange.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });

    blocksToChange.forEach((block) => {
      grid[block[0]][block[1]] = '.';
    });

    blocksToChange.forEach((block, index) => {
      grid[block[0] + dx][block[1] + dy] = index % 2 === 0 ? '[' : ']';
    });

    newPosition = [x + dx, y + dy];

    grid[newPosition[0]][newPosition[1]] = '@';
    return newPosition;
  } else {
    return currentPosition;
  }
}

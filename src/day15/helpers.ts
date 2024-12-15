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

export function parseInput(input: string): PuzzleInput {
  const [grid, instructions] = input.split('\n\n');

  return {
    grid: grid.split('\n').map((row) => row.split('')),
    instructions: instructions
      .split('\n')
      .flatMap(
        (instruction) =>
          instruction.split('') as (keyof typeof directionsMap)[],
      ),
  };
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

  //console.log('nextBlockPosition', blocksToChange);

  const orderedBlocks = blocksToChange.sort((a, b) => a.localeCompare(b));

  //console.log('orderedBlocks', orderedBlocks);

  const lastDotIndex = orderedBlocks.lastIndexOf('.');

  let newCurrentPosition = [x, y];

  orderedBlocks.forEach((char, index) => {
    const nextPosition = [
      Math.abs(newPosition[0] + dx * index),
      Math.abs(newPosition[1] + dy * index),
    ];

    if (index === lastDotIndex) {
      //console.log(`Setting @ at ${nextPosition}`);
      newCurrentPosition = nextPosition;
      grid[currentPosition[0]][currentPosition[1]] = '.';
      grid[nextPosition[0]][nextPosition[1]] = '@';
    } else {
      grid[nextPosition[0]][nextPosition[1]] = char;
    }
  });

  //console.log('lastDotIndex', lastDotIndex);

  return newCurrentPosition;
}

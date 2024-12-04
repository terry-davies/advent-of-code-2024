const wordMap = {
  M: 1,
  A: 2,
  S: 3,
};

const directions = [
  [0, 1], // Right
  [1, 0], // Down
  [1, 1], // Diagonal down-right
  [-1, 1], // Diagonal up-right
  [0, -1], // Left
  [-1, 0], // Up
  [-1, -1], // Diagonal up-left
  [1, -1], // Diagonal down-left
];

export function processString(input: string): number {
  const grid = input.split('\n').map((row) => row.split(''));
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const cell = grid[row][column];

      if (cell === 'X') {
        count += checkForWord(grid, [row, column]);
      }
    }
  }

  return count;
}

function checkForWord(grid: string[][], cell: [number, number]): number {
  let count = 0;

  for (const direction of directions) {
    let found = true;

    for (const character of Object.keys(wordMap)) {
      const charDistance = wordMap[character as keyof typeof wordMap];
      const cellToCheck = [
        direction[0] * charDistance + cell[0],
        direction[1] * charDistance + cell[1],
      ];

      if (
        cellToCheck[0] < 0 ||
        cellToCheck[1] < 0 ||
        cellToCheck[0] >= grid.length ||
        cellToCheck[1] >= grid[0].length
      ) {
        found = false;
        break;
      }

      const cellValue = grid[cellToCheck[0]][cellToCheck[1]];

      if (cellValue !== character) {
        found = false;
        break;
      }
    }

    if (found) {
      count++;
    }
  }

  return count;
}

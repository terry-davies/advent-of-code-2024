export function parseInput(input: string) {
  return input.split('\n');
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export function processPart1(input: string[], size = 70): string {
  const start = [0, 0];

  const steps = walk(input, start, [size, size]);

  return steps;
}

const walk = (corruptCells: string[], start: number[], end: number[]) => {
  let steps = 0;
  console.log(`corruptCells: ${corruptCells.length}`);
  let brokenByte = 0;

  for (let j = corruptCells.length; j >= 0; j--) {
    console.log(`Byte: ${j}`);
    const bytes = corruptCells.slice(0, j);
    console.log(`Bytes: ${bytes.length}`);
    let isFound = false;

    const queue: [number, number][] = [[start[0], start[1]]];

    const visited = new Set<string>();

    while (queue.length) {
      const queueLength = queue.length;

      for (let i = 0; i < queueLength; i++) {
        const [x, y] = queue.shift()!;

        if (x === end[0] && y === end[1]) {
          console.log('Found end');
          isFound = true;
          break;
        }

        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          const isCorrupt = bytes.some((cell) => {
            const [cx, cy] = cell.split(',').map(Number);
            return cx === nx && cy === ny;
          });

          //console.log(`Is corrupt: ${isCorrupt} at ${nx},${ny}`);

          if (
            nx < 0 ||
            nx >= end[0] + 1 ||
            ny < 0 ||
            ny >= end[1] + 1 ||
            isCorrupt ||
            visited.has(`${nx},${ny}`)
          ) {
            continue;
          }

          queue.push([nx, ny]);
          visited.add(`${nx},${ny}`);
        }
      }

      steps++;
    }

    if (!isFound) {
      brokenByte = j;
    } else {
      break;
    }
  }

  return corruptCells[brokenByte];
};

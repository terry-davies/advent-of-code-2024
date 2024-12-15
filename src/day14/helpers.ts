const pattern = /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/;

function extractRobotData(input: string) {
  const matches = input.match(pattern);

  const [_, px, py, vx, vy] = matches;

  return {
    position: { x: parseInt(px), y: parseInt(py) } as Position,
    velocity: { x: parseInt(vx), y: parseInt(vy) } as Velocity,
  };
}

type RobotData = ReturnType<typeof extractRobotData>;
type Position = { x: number; y: number };
type Velocity = { x: number; y: number };

export function parseInput(input: string): RobotData[] {
  return input.split('\n').map(extractRobotData);
}

export function moveRobot(
  robot: RobotData,
  gridHeight: number,
  gridWidth: number,
  seconds: number,
): Position {
  const { position, velocity } = robot;

  const newX = position.x + velocity.x * seconds;
  const newY = position.y + velocity.y * seconds;

  const wrappedX = ((newX % gridWidth) + gridWidth) % gridWidth;
  const wrappedY = ((newY % gridHeight) + gridHeight) % gridHeight;

  return {
    x: wrappedX,
    y: wrappedY,
  } as Position;
}

export function processPart1(
  robots: RobotData[],
  gridHeight: number,
  gridWidth: number,
  seconds: number,
): number {
  return moveAllRobots(robots, gridHeight, gridWidth, seconds);
}

export function processPart2(
  robots: RobotData[],
  gridHeight: number,
  gridWidth: number,
): number {
  let seconds = 1;

  while (true) {
    const result = moveAllRobots(robots, gridHeight, gridWidth, seconds, true);
    seconds++;
    if (result > 0) {
      return result;
    }
  }
}

export function moveAllRobots(
  robots: RobotData[],
  gridHeight: number,
  gridWidth: number,
  seconds: number,
  isPart2 = false,
): number {
  let grid: number[][] = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(0),
  );

  const finalPositions = robots.map((robot) =>
    moveRobot(robot, gridHeight, gridWidth, seconds),
  );

  finalPositions.forEach(({ x, y }) => {
    grid[y][x]++;
  });

  if (!isPart2) {
    const quadrantVerticalFloor = Math.floor(gridWidth / 2);
    const quadrantHorizontalFloor = Math.floor(gridHeight / 2);

    const quadrantResults = finalPositions.reduce(
      (acc, { x, y }) => {
        if (x < quadrantVerticalFloor && y < quadrantHorizontalFloor) {
          acc[0]++;
        } else if (x > quadrantVerticalFloor && y < quadrantHorizontalFloor) {
          acc[1]++;
        } else if (x < quadrantVerticalFloor && y > quadrantHorizontalFloor) {
          acc[2]++;
        } else if (x > quadrantVerticalFloor && y > quadrantHorizontalFloor) {
          acc[3]++;
        }
        return acc;
      },
      [0, 0, 0, 0],
    );

    return quadrantResults.reduce((acc, count) => {
      if (acc === 0) {
        return count;
      } else {
        return acc * count;
      }
    }, 0);
  }

  const isTreeFound = findTree(grid, 100);

  if (isTreeFound) {
    console.log('seconds', seconds);
    console.log('grid', grid.map((row) => row.join('')).join('\n'));
    return seconds;
  }

  return 0;
}

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const findTree = (grid: number[][], size: number) => {
  const visited: boolean[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false),
  );

  const height = grid.length;
  const width = grid[0].length;

  const dfs = (pos: Position) => {
    const stack: Position[] = [pos];
    let clusterSize = 0;

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (visited[current.y][current.x]) {
        continue;
      }

      visited[current.y][current.x] = true;
      clusterSize++;

      for (const dir of directions) {
        const next: Position = { x: current.x + dir[0], y: current.y + dir[1] };

        if (
          next.x >= 0 &&
          next.x < width &&
          next.y >= 0 &&
          next.y < height &&
          grid[next.y][next.x] > 0 &&
          !visited[next.y][next.x]
        ) {
          stack.push(next);
        }
      }
    }

    return clusterSize;
  };

  let isTreeFound = false;

  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      if (grid[y][x] <= 0 || visited[y][x]) {
        continue;
      }

      const clusterSize = dfs({ x, y });

      if (clusterSize >= size) {
        isTreeFound = true;
        break;
      }
    }

    if (isTreeFound) {
      break;
    }
  }

  return isTreeFound;
};

//12319 too high

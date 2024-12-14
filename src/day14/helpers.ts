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
  let grid: number[][] = Array.from({ length: gridHeight }, () =>
    Array(gridWidth).fill(0),
  );

  const finalPositions = robots.map((robot) =>
    moveRobot(robot, gridHeight, gridWidth, seconds),
  );

  finalPositions.forEach(({ x, y }) => {
    grid[y][x]++;
  });

  //console.log(grid.map((row) => row.join(' ')).join('\n'));

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

export function parseInput(input: string): number[] {
  return input.split(' ').map(Number);
}

export function processPart1(input: number[]): number {
  let stones = [...input];
  let count = 0;

  const stoneMemo = new Map<string, number>();

  for (const stone of stones) {
    count += moveStone(stone, stoneMemo, 25);
  }

  return count;
}

export function processPart2(input: number[]): number {
  let stones = [...input];
  let count = 0;

  const stoneMemo = new Map<string, number>();

  for (const stone of stones) {
    count += moveStone(stone, stoneMemo);
  }

  return count;
}

const moveStone = (
  stone: number,
  stoneMemo: Map<string, number>,
  currentBlink = 75,
): number => {
  const memoKey = `${stone.toString()}-${currentBlink}`;
  if (stoneMemo.has(memoKey)) return stoneMemo.get(memoKey);

  if (currentBlink === 0) return 1;

  let stoneCount = 0;

  const stoneLength = stone.toString().length;

  if (stone === 0) {
    stoneCount += moveStone(1, stoneMemo, currentBlink - 1);
  } else if (stoneLength % 2 === 0) {
    const stoneStr = stone.toString();
    const mid = Math.floor(stoneLength / 2);
    const firstHalf = stoneStr.substring(0, mid);
    const secondHalf = stoneStr.substring(mid);

    stoneCount +=
      moveStone(parseInt(firstHalf), stoneMemo, currentBlink - 1) +
      moveStone(parseInt(secondHalf), stoneMemo, currentBlink - 1);
  } else {
    stoneCount += moveStone(stone * 2024, stoneMemo, currentBlink - 1);
  }

  stoneMemo.set(memoKey, stoneCount);

  return stoneCount;
};

function moveStones(stones: number[]) {
  let newStones = [];

  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i];
    const stoneLength = stone.toString().length;

    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    if (stoneLength % 2 === 0) {
      const stoneStr = stone.toString();
      const mid = Math.floor(stoneLength / 2);
      const firstHalf = stoneStr.substring(0, mid);
      const secondHalf = stoneStr.substring(mid);

      newStones.push(parseInt(firstHalf));
      newStones.push(parseInt(secondHalf));
      continue;
    }

    newStones.push(stone * 2024);
  }

  return newStones;
}

//469057662 low

export function parseInput(input: string): number[] {
  return input.split(' ').map(Number);
}

export function processPart1(input: number[]): number {
  let stones = [...input];

  for (let i = 0; i < 25; i++) {
    stones = moveStones(stones);
  }

  return stones.length;
}

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

export function parseInput(input: string): string[] {
  const diskMap = [];

  let id = 0;

  for (let i = 0; i < input.length; i++) {
    const record = Number(input[i]);

    for (let j = 0; j < record; j++) {
      diskMap.push(i % 2 == 0 ? id.toString() : '.');
    }
    if (i % 2 == 0) id++;
  }

  return diskMap;
}

export function moveDiskBlocks(diskBlocks: string[]) {
  const blocks = [...diskBlocks];

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === '.') {
      continue;
    }

    const firstEmptyBlock = blocks.findIndex(
      (block, index) => block == '.' && index < i,
    );

    if (firstEmptyBlock === -1) {
      continue;
    }

    blocks[firstEmptyBlock] = blocks[i];

    blocks[i] = '.';
  }

  return blocks;
}

export function moveDiskBlocks2(diskBlocks: string[]) {
  const blocks = [...diskBlocks];

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === '.') {
      continue;
    }

    const firstEmptyBlock = blocks.findIndex(
      (block, index) => block == '.' && index < i,
    );

    if (firstEmptyBlock === -1) {
      continue;
    }

    blocks[firstEmptyBlock] = blocks[i];

    blocks[i] = '.';
  }

  return blocks;
}

function calculateCheckSum(diskBlocks: string[]) {
  return diskBlocks.reduce((acc, curr, index) => {
    return acc + (curr == '.' ? 0 : index * Number(curr));
  }, 0);
}

export function processPart1(input: string[]): number {
  const diskBlocksMoved = moveDiskBlocks(input);

  const checkSum = calculateCheckSum(diskBlocksMoved);

  return checkSum;
}

export function processPart2(input: string[]): number {
  const diskBlocksMoved = moveDiskBlocks2(input);

  const checkSum = calculateCheckSum(diskBlocksMoved);

  return checkSum;
}

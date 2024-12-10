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

export function moveDiskBlocks2(
  diskBlocks: string[],
): { id: string; count: number; moved: boolean }[] {
  let mappedBlocks: { id: string; count: number; moved: boolean }[] = [];
  let currentBlock = null;
  let currentCount = 0;

  while (diskBlocks.length > 0) {
    const nextBlock = diskBlocks.shift();

    if (currentBlock === null) {
      currentBlock = nextBlock;
      currentCount++;
      continue;
    }

    if (currentBlock === nextBlock) {
      currentCount++;
    } else {
      mappedBlocks.push({
        id: currentBlock,
        count: currentCount,
        moved: false,
      });
      currentCount = 1;
      currentBlock = nextBlock;
    }

    if (diskBlocks.length === 0) {
      mappedBlocks.push({
        id: currentBlock,
        count: currentCount,
        moved: false,
      });
    }
  }

  for (let i = mappedBlocks.length - 1; i >= 0; i--) {
    if (mappedBlocks[i].id === '.' || mappedBlocks[i].moved) continue;

    const length = mappedBlocks[i].count;

    const dotIndex = mappedBlocks.findIndex((block, index) => {
      return block.id === '.' && index < i && block.count >= length;
    });

    if (dotIndex !== -1) {
      const temp = { ...mappedBlocks[i], moved: true };
      const dot = mappedBlocks[dotIndex];

      const lengthDiff = dot.count - length;

      if (lengthDiff > 0) {
        if (mappedBlocks[dotIndex + 1]?.id === '.') {
          mappedBlocks[dotIndex + 1].count += lengthDiff;
          mappedBlocks[dotIndex] = temp;
        } else if (mappedBlocks[dotIndex - 1]?.id === '.') {
          mappedBlocks[dotIndex - 1].count += lengthDiff;
          mappedBlocks[dotIndex] = temp;
        } else {
          mappedBlocks.splice(dotIndex, 1, temp, {
            id: '.',
            count: lengthDiff,
            moved: false,
          });
        }
      } else {
        mappedBlocks[dotIndex] = temp;
      }
    }
  }

  return mappedBlocks;
}

function calculateCheckSum(diskBlocks: string[]) {
  return diskBlocks.reduce((acc, curr, index) => {
    return acc + (curr == '.' ? 0 : index * Number(curr));
  }, 0);
}

function calculateCheckSumPart2(
  diskBlocks: { id: string; count: number; moved: boolean }[],
) {
  let index = 0;
  let checkSum = 0;

  for (let i = 0; i < diskBlocks.length; i++) {
    if (diskBlocks[i].id === '.') {
      index += diskBlocks[i].count;
    } else {
      for (let j = 0; j < diskBlocks[i].count; j++) {
        checkSum += index * parseInt(diskBlocks[i].id);
        index++;
      }
    }
  }

  return checkSum;
}

export function processPart1(input: string[]): number {
  const diskBlocksMoved = moveDiskBlocks(input);

  const checkSum = calculateCheckSum(diskBlocksMoved);

  return checkSum;
}

export function processPart2(input: string[]): number {
  const diskBlocksMoved = moveDiskBlocks2(input);

  const checkSum = calculateCheckSumPart2(diskBlocksMoved);

  return checkSum;
}

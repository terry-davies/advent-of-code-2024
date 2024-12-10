import {
  parseInput,
  processPart1,
  moveDiskBlocks,
  processPart2,
} from './helpers';

const example1 = `2333133121414131402`;
const example2 = '1313165';

describe('Day 9', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input);
      expect(total).toBe(1928);
    });
  });

  describe('move disk blocks', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);

      const movedBlocks = moveDiskBlocks(input);
      expect(movedBlocks.join('')).toBe(
        '0099811188827773336446555566..............',
      );
    });
    it('should return correct value for string 12345', () => {
      const input = parseInput('12345');

      const movedBlocks = moveDiskBlocks(input);
      expect(movedBlocks.join('')).toBe('022111222......');
    });
  });

  describe('part 2', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);

      const total = processPart2(input);
      expect(total).toBe(2858);
    });
  });

  it('should return correct value for string', () => {
    const input = parseInput(example2);

    const total = processPart2(input);
    expect(total).toBe(169);
  });
});

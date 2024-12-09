import { parseInput, processPart1, moveDiskBlocks } from './helpers';

const example1 = `2333133121414131402`;

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
      expect(movedBlocks).toBe('0099811188827773336446555566..............');
    });
    it('should return correct value for string 12345', () => {
      const input = parseInput('12345');

      const movedBlocks = moveDiskBlocks(input);
      expect(movedBlocks).toBe('022111222......');
    });
  });
});

import { processStringPart1, processStringPart2 } from './helpers';

const example1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

describe('Day 4', () => {
  describe('process string part 1', () => {
    it('should return correct value for string', () => {
      expect(processStringPart1(example1)).toBe(18);
    });
  });

  describe('process string part 2', () => {
    it('should return correct value for string', () => {
      expect(processStringPart2(example1)).toBe(9);
    });
  });
});

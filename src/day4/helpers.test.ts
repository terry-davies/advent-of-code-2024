import { processString } from './helpers';

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
  describe('process string ', () => {
    it('should return correct value for string', () => {
      expect(processString(example1)).toBe(18);
    });
  });
});

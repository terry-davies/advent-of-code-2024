import { parseInput, processPart1 } from './helpers';

const example1 = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

describe('Day 19', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input);
      expect(total).toBe(16);
    });
  });
});

import { parseInput, processPart1 } from './helpers';

const example1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

describe('Day 17', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input);
      expect(total).toBe('4,6,3,5,6,3,5,2,1,0');
    });
  });
});

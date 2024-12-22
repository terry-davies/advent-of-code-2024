import { parseInput, processPart1, processPart2 } from './helpers';

const example1 = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const example2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

describe('Day 17', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input);
      expect(total).toBe('4,6,3,5,6,3,5,2,1,0');
    });
  });

  describe('process part 2', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example2);
      const total = processPart2(input);
      expect(total).toBe(117440);
    });
  });
});

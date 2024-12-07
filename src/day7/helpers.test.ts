import { processStringPart1, handleEquation } from './helpers';

const example1 = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe('Day 6', () => {
  describe('process string part 1', () => {
    it('should return correct value for string', () => {
      const total = processStringPart1(example1);
      expect(total).toBe(3749);
    });
  });

  describe('handle equation', () => {
    it.each([
      [{ inputs: [10, 19], total: 190 }, 190],
      [{ inputs: [81, 40, 27], total: 3267 }, 3267],
    ])('should return correct value for string', (equation, expected) => {
      const total = handleEquation(equation);
      expect(total).toBe(expected);
    });
  });
});

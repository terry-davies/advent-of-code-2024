import { processStringPart1, processStringPart2 } from './helpers';

const example1 =
  'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

const example2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

describe('Day 3', () => {
  describe('process string part 1', () => {
    it('should return correct value for string', () => {
      expect(processStringPart1(example1)).toBe(161);
    });
  });

  describe('process string part 2', () => {
    it('should return correct value for string', () => {
      expect(processStringPart2(example2)).toBe(48);
    });
  });
});

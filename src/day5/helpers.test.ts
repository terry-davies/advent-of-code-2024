import { processStringPart1 } from './helpers';

const example1 = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

describe('Day 5', () => {
  describe('process string part 1', () => {
    it('should return correct value for string', () => {
      const { totalPart1 } = processStringPart1(example1);
      expect(totalPart1).toBe(143);
    });
  });

  describe('process string part 2', () => {
    it('should return correct value for string', () => {
      const { totalPart2 } = processStringPart1(example1);
      expect(totalPart2).toBe(123);
    });
  });
});

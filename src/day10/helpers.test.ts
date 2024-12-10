import { parseInput, processPart1, processPart2 } from './helpers';

const example1 = [
  `0123
1234
8765
9876`,
  1,
];

const example2 = [
  `1110111
1111111
1112111
6543456
7111117
8111118
9111119`,
  2,
];

const example3 = [
  `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
  36,
];

describe('Day 10', () => {
  describe('process part 1', () => {
    it.each([example1, example2, example3])(
      'should return correct value for string',
      (map, expected) => {
        const input = parseInput(map as string);
        const total = processPart1(input);
        expect(total).toBe(expected as number);
      },
    );
  });

  describe('process part 2', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example3[0] as string);
      const total = processPart2(input);
      expect(total).toBe(81 as number);
    });
  });
});

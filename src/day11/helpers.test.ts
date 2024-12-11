import { parseInput, processPart1 } from './helpers';

const example1 = ['125 17', 55312];

describe('Day 11', () => {
  describe('process part 1', () => {
    it.each([example1])(
      'should return correct value for string',
      (map, expected) => {
        const input = parseInput(map as string);
        const total = processPart1(input);
        expect(total).toBe(expected as number);
      },
    );
  });
});

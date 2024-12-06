import { processStringPart1 } from './helpers';

const example1 = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

describe('Day 6', () => {
  describe('process string part 1', () => {
    it('should return correct value for string', () => {
      const { part1 } = processStringPart1(example1);
      expect(part1).toBe(41);
    });
  });

  describe('process string part 2', () => {
    it('should return correct value for string', () => {
      const { part2 } = processStringPart1(example1);
      expect(part2).toBe(6);
    });
  });
});

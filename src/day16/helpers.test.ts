import { parseInput, processPart1, processPart2 } from './helpers';

const example1 = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

describe('Day 16', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input);
      expect(total).toBe(7036);
    });
  });

  describe('process part 2', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1, true);
      const total = processPart2(input);
      expect(total).toBe(9021);
    });
  });
});

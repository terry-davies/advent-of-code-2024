import { processPart1 } from './helpers';

const example1 = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

describe('Day 7', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const total = processPart1(example1);
      expect(total).toBe(14);
    });
  });
});

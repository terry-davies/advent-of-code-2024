import { parseInput, processPart1, moveRobot } from './helpers';

const example1 = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

describe('Day 14', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1 as string);
      const total = processPart1(input, 7, 11, 100);
      expect(total).toBe(12);
    });
  });

  describe('move robot', () => {
    it('should move correctly', () => {
      const input = parseInput('p=2,4 v=2,-3');

      let result = moveRobot(input[0], 7, 11, 0);
      expect(result).toEqual({ x: 2, y: 4 });

      result = moveRobot(input[0], 7, 11, 1);
      expect(result).toEqual({ x: 4, y: 1 });

      result = moveRobot(input[0], 7, 11, 2);
      expect(result).toEqual({ x: 6, y: 5 });

      result = moveRobot(input[0], 7, 11, 3);
      expect(result).toEqual({ x: 8, y: 2 });

      result = moveRobot(input[0], 7, 11, 4);
      expect(result).toEqual({ x: 10, y: 6 });

      result = moveRobot(input[0], 7, 11, 5);
      expect(result).toEqual({ x: 1, y: 3 });
    });
  });
});

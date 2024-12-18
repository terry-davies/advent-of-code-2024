import { parseInput, processPart1 } from './helpers';

const example1 = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

describe('Day 18', () => {
  describe('process part 1', () => {
    it('should return correct value for string', () => {
      const input = parseInput(example1);
      const total = processPart1(input, 7);
      expect(total).toBe(22);
    });
  });
});

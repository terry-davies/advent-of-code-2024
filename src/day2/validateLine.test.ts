import { validateLine } from './validateLine';

describe('Day 2', () => {
  describe('validateLine', () => {
    it.each([
      ['7 6 4 2 1', true],
      ['1 2 7 8 9', false],
      ['9 7 6 2 1', false],
      ['1 3 2 4 5', false],
      ['8 6 4 4 1', false],
      ['1 3 6 7 9', true],
      ['84 87 89 86 87 87', false],
      ['12 10 12 14 15 16 19 22', false],
      ['68 65 68 67 68 72', false],
      ['68 65 68 67 68 72', false],
      ['70 69 66 63 60 58 55 55', false],
      ['24 21 20 19 16 16 14 15', false],
      ['94 91 89 87 83 82 79', false],
      ['94 91 89 87 83 82 79', false],
      ['21 18 13 11 8 5', false],
      ['37 34 31 25 23 19', false],
      ['86 87 88 91 96', false],
      ['40 42 44 46 49 51', true],
    ])('should return %s for line', (input, expected) => {
      expect(validateLine(input)).toBe(expected);
    });
  });
});

const mulRegexPart1 = /(?:mul\()(\d+)(?:,)(\d+)(?:\))/g;
const mulRegexPart2 = /((?:mul\()(\d+)(?:,)(\d+)(?:\))|(do\(\))|(don't\(\)))/g;

export const processStringPart1 = (input: string): number => {
  const matches = input.matchAll(mulRegexPart1);
  if (!matches) {
    return 0;
  }

  let total = 0;

  for (const match of matches) {
    const result = Number(match[1]) * Number(match[2]);
    total += result;
  }

  return total;
};

export const processStringPart2 = (input: string): number => {
  const matches = input.matchAll(mulRegexPart2);
  if (!matches) {
    return 0;
  }

  let total = 0;
  let shouldMultiply = true;

  for (const match of matches) {
    if (match[0] === 'do()') {
      shouldMultiply = true;
      continue;
    }

    if (match[0] === "don't()") {
      shouldMultiply = false;
      continue;
    }

    if (!shouldMultiply) continue;

    const result = Number(match[2]) * Number(match[3]);
    total += result;
  }

  return total;
};

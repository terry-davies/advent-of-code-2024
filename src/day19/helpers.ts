export function parseInput(input: string) {
  const [patterns, designs] = input.split('\n\n');

  return {
    patterns: patterns.split(', ').sort((a, b) => b.length - a.length),
    designs: designs.split('\n'),
  };
}

type Input = ReturnType<typeof parseInput>;

export function processPart1(input: Input): number {
  console.log(input);

  const cache = new Map<string, number>();

  let total = 0;

  total = input.designs.reduce((acc, design) => {
    acc += walkPattern(design, input.patterns, cache);

    return acc;
  }, 0);

  return total;
}

function walkPattern(
  design: string,
  patterns: string[],
  cache: Map<string, number>,
): number {
  if (cache.has(design)) {
    return cache.get(design) as number;
  }

  if (design === '') {
    return 1;
  }

  let canBeTowelCount = 0;

  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      const cloneDesign = design.slice(pattern.length);

      canBeTowelCount += walkPattern(cloneDesign, patterns, cache);
    }
  }

  cache.set(design, canBeTowelCount);

  console.log(design, canBeTowelCount);

  return canBeTowelCount;
}

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

  const cache = new Map<string, boolean>();

  let total = 0;

  total = input.designs.reduce((acc, design) => {
    if (walkPattern(design, input.patterns, cache)) {
      acc++;
    }

    return acc;
  }, 0);

  return total;
}

function walkPattern(
  design: string,
  patterns: string[],
  cache: Map<string, boolean>,
): boolean {
  if (cache.has(design)) {
    return cache.get(design) as boolean;
  }

  if (design === '') {
    return true;
  }

  let canBeTowel = false;

  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      const cloneDesign = design.slice(pattern.length);

      canBeTowel = walkPattern(cloneDesign, patterns, cache);
      cache.set(cloneDesign, canBeTowel);

      if (canBeTowel) {
        break;
      }
    }
  }

  return canBeTowel;
}

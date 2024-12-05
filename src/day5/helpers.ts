export function processStringPart1(input: string): {
  totalPart1: number;
  totalPart2: number;
} {
  const [orderRulesString, pagesString] = input.split('\n\n');

  const orderRules = orderRulesString
    .split('\n')
    .map((rule) => rule.split('|').map(Number))
    .reduce(
      (acc, [a, b]) => {
        if (acc[a.toString()]) {
          acc[a.toString()].push(b);
        } else {
          acc[a.toString()] = [b];
        }

        return acc;
      },
      {} as Record<string, number[]>,
    );

  const pages = pagesString
    .split('\n')
    .map((page) => page.split(',').map(Number));

  let totalPart1 = 0;

  const incorrectEntries = [];

  for (const page of pages) {
    const tempPage = [...page];
    let isValid = true;

    while (page.length > 1) {
      const currentEntry = page.shift();

      const rulesForEntry = orderRules[currentEntry.toString()];

      if (!rulesForEntry) {
        isValid = false;
        break;
      }

      const allMatch = page.every((entry) => rulesForEntry.includes(entry));

      if (!allMatch) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      totalPart1 += tempPage[(tempPage.length - 1) / 2];
    } else {
      incorrectEntries.push(tempPage);
    }
  }

  const sortedIncorrectEntries = incorrectEntries.map((entry) => {
    return entry.sort((a, b) => {
      const rulesForEntry = orderRules[a.toString()];

      if (!rulesForEntry) {
        return 0;
      }

      return rulesForEntry.find((entry) => entry === b) ? -1 : 1;
    });
  });

  const totalPart2 = sortedIncorrectEntries.reduce((acc, entry) => {
    acc += entry[(entry.length - 1) / 2];
    return acc;
  }, 0);

  return { totalPart1, totalPart2 };
}

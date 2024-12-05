export function processStringPart1(input: string): number {
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

  let total = 0;

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
      total += tempPage[(tempPage.length - 1) / 2];
    }
  }

  return total;
}

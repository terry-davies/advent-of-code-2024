const pattern =
  /(?:Button A: X[+=](\d+), Y[+=](\d+))|(?:Button B: X[+=](\d+), Y[+=](\d+))|(?:Prize: X[+=](\d+), Y[+=](\d+))/g;

function extractGameDetail(input: string) {
  const matches = [...input.matchAll(pattern)];

  return {
    buttonA: {
      x: parseInt(matches[0][1]),
      y: parseInt(matches[0][2]),
    },
    buttonB: {
      x: parseInt(matches[1][3]),
      y: parseInt(matches[1][4]),
    },
    prize: {
      x: parseInt(matches[2][5]) + 10000000000000,
      y: parseInt(matches[2][6]) + 10000000000000,
    },
  };
}

type GameDetail = ReturnType<typeof extractGameDetail>;

export function parseInput(input: string): GameDetail[] {
  return input.split('\n\n').map(extractGameDetail);
}

// Play A costs 3
// Play B costs 1

// Button push less than 100

export function processPart1(games: GameDetail[]): number {
  return games
    .map((game) => {
      const { buttonA, buttonB, prize } = game;
      // Cramer's Rule
      // ax + by = c
      // dx + ey = f
      // x = (ce - bf) / (ae - bd)
      // y = (af - cd) / (ae - bd)

      const b =
        (buttonA.x * prize.y - buttonA.y * prize.x) /
        (buttonA.x * buttonB.y - buttonA.y * buttonB.x);
      const a = (prize.x - b * buttonB.x) / buttonA.x;

      return { a, b };
    })
    .filter(({ a, b }) => Number.isInteger(a) && Number.isInteger(b))
    .reduce((acc, { a, b }) => {
      return acc + 3 * a + b;
    }, 0);
}

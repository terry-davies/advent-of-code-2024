function parseInput(input: string): {
  data: Record<string, [[number, number]]>;
  height: number;
  width: number;
} {
  const radars: Record<string, [[number, number]]> = {};
  const rows = input.split('\n');

  rows.forEach((line, row) => {
    const cells = line.split('');

    for (let col = 0; col < cells.length; col++) {
      const cell = cells[col];

      if (cell === '.') {
        continue;
      }

      if (!radars[cell]) {
        radars[cell] = [[row, col]];
      } else {
        radars[cell].push([row, col]);
      }
    }
  });

  return { data: radars, height: rows.length, width: rows[0].length };
}

export function processPart1(input: string): number {
  const { data, height, width } = parseInput(input);
  const antidotes = new Set<string>();

  for (const key in data) {
    const radars = data[key];

    while (radars.length > 1) {
      const nextRadar = radars.shift();

      for (const currentRadar of radars) {
        const [row1, col1] = nextRadar;
        const [row2, col2] = currentRadar;

        const diffRow = row2 - row1;
        const diffCol = col2 - col1;

        const antidotePos1 = [row1 + diffRow * -1, col1 + diffCol * -1];
        const antidotePos2 = [row2 + diffRow, col2 + diffCol];

        if (
          antidotePos1[0] >= 0 &&
          antidotePos1[0] < height &&
          antidotePos1[1] >= 0 &&
          antidotePos1[1] < width
        ) {
          antidotes.add(antidotePos1.toString());
        }

        if (
          antidotePos2[0] >= 0 &&
          antidotePos2[0] < height &&
          antidotePos2[1] >= 0 &&
          antidotePos2[1] < width
        ) {
          antidotes.add(antidotePos2.toString());
        }
      }
    }
  }

  return antidotes.size;
}

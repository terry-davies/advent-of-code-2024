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

function handleRadarPart2(
  start: [number, number],
  diff: [number, number],
  height: number,
  width: number,
): Set<string> {
  let isOutOfBound = false;
  let antidotePos = [start[0] + diff[0], start[1] + diff[1]];
  let antidotes = new Set<string>();

  antidotes.add(start.toString());

  while (!isOutOfBound) {
    if (
      antidotePos[0] >= 0 &&
      antidotePos[0] < height &&
      antidotePos[1] >= 0 &&
      antidotePos[1] < width
    ) {
      antidotes.add(antidotePos.toString());
    } else {
      isOutOfBound = true;
    }

    antidotePos = [antidotePos[0] + diff[0], antidotePos[1] + diff[1]];
  }

  return antidotes;
}

export function processPart1(input: string): { part1: number; part2: number } {
  const { data, height, width } = parseInput(input);
  const antidotes = new Set<string>();
  const antidotesPart2 = new Set<string>();

  for (const key in data) {
    const radars = data[key];

    while (radars.length > 1) {
      const nextRadar = radars.shift();

      for (const currentRadar of radars) {
        const [row1, col1] = nextRadar;
        const [row2, col2] = currentRadar;

        const diffRow = row2 - row1;
        const diffCol = col2 - col1;

        let antidotePos1 = [row1 + diffRow * -1, col1 + diffCol * -1];
        let antidotePos2 = [row2 + diffRow, col2 + diffCol];

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

        const firstRadarAntidotes = handleRadarPart2(
          currentRadar,
          [diffRow * -1, diffCol * -1],
          height,
          width,
        );

        const secondRadarAntidotes = handleRadarPart2(
          currentRadar,
          [diffRow, diffCol],
          height,
          width,
        );

        firstRadarAntidotes.forEach((antidote) => {
          antidotesPart2.add(antidote);
        });

        secondRadarAntidotes.forEach((antidote) => {
          antidotesPart2.add(antidote);
        });
      }
    }
  }

  return { part1: antidotes.size, part2: antidotesPart2.size };
}

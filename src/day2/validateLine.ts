export function validateLine(report: number[]): boolean {
  const isDiffValid = report.every((value, index) => {
    if (index === 0) {
      return true;
    }

    const diff = Math.abs(report[index] - report[index - 1]);

    return diff >= 1 && diff <= 3;
  });

  const isOrderValidAsc = report.every((value, index) => {
    if (index === 0) {
      return true;
    }

    return report[index] > report[index - 1];
  });

  const isOrderValidDesc = report.every((value, index) => {
    if (index === 0) {
      return true;
    }

    return report[index] < report[index - 1];
  });

  return isDiffValid && (isOrderValidAsc || isOrderValidDesc);
}

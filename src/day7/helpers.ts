type Equations = {
  total: number;
  inputs: number[];
};

function mapInput(input: string): Equations[] {
  return input.split('\n').map((line) => {
    const [total, inputs] = line.split(':');
    return {
      total: parseInt(total),
      inputs: inputs
        .trim()
        .split(' ')
        .map((input) => parseInt(input)),
    };
  });
}

function generateOperatorCombinations(
  length: number,
  operatorSymbols: string[],
): string[] {
  const combinations = [];
  const operatorsLength = operatorSymbols.length;
  for (let i = 0; i < Math.pow(operatorsLength, length - 1); i++) {
    const binary = i.toString(operatorsLength).padStart(length - 1, '0');

    const operators = binary
      .split('')
      .map((bit) => operatorSymbols[parseInt(bit)]);

    combinations.push(operators.join(''));
  }

  return combinations;
}

function getAllCombinations(numbers: number[]): number[][] {
  if (numbers.length === 0) return [[]];
  if (numbers.length === 1) return [[numbers[0]]];
  if (numbers.length === 2) {
    const concatenated = parseInt(`${numbers[0]}${numbers[1]}`);
    return [[concatenated], [numbers[0], numbers[1]]];
  }

  const result: number[][] = [];

  const concatenated = parseInt(`${numbers[0]}${numbers[1]}`);
  const withConcatenation = getAllCombinations([
    concatenated,
    ...numbers.slice(2),
  ]);
  result.push(...withConcatenation);

  const withoutConcatenation = getAllCombinations(numbers.slice(1));
  withoutConcatenation.forEach((combo) => {
    result.push([numbers[0], ...combo]);
  });

  return result;
}
export function handleEquation(equation: Equations): number {
  const operators = generateOperatorCombinations(equation.inputs.length, [
    '+',
    '*',
  ]);

  for (const operator of operators) {
    const equationTotal = equation.inputs.reduce((acc, curr, index) => {
      if (index === 0) {
        return curr;
      }

      if (operator[index - 1] === '+') {
        return acc + curr;
      }

      return acc * curr;
    }, 0);

    if (equationTotal === equation.total) {
      return equation.total;
    }
  }

  return 0;
}

export function handleEquationPart2(equation: Equations): number {
  const operators = generateOperatorCombinations(equation.inputs.length, [
    '+',
    '*',
    '|',
  ]);

  for (const operator of operators) {
    const equationTotal = equation.inputs.reduce((acc, curr, index) => {
      if (index === 0) {
        return curr;
      }

      if (operator[index - 1] === '+') {
        return acc + curr;
      }

      if (operator[index - 1] === '*') {
        return acc * curr;
      }

      return parseInt(`${acc}${curr}`);
    }, 0);

    if (equationTotal === equation.total) {
      return equation.total;
    }
  }

  return 0;
}

export function processStringPart1(input: string): {
  totalPart1: number;
  totalPart2: number;
} {
  const equations = mapInput(input);
  let totalPart1 = 0;
  let totalPart2 = 0;
  const incorrectEquations = [];

  for (const equation of equations) {
    const equationTotal = handleEquation(equation);

    if (equationTotal === 0) {
      incorrectEquations.push(equation);
    } else {
      totalPart1 += handleEquation(equation);
    }
  }

  for (const equation of incorrectEquations) {
    totalPart2 += handleEquationPart2(equation);
  }

  return { totalPart1, totalPart2: totalPart1 + totalPart2 };
}

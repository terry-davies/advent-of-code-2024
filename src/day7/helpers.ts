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

function generateOperatorCombinations(length: number): string[] {
  const combinations = [];
  for (let i = 0; i < Math.pow(2, length - 1); i++) {
    const binary = i.toString(2).padStart(length - 1, '0');
    const operators = binary.split('').map((bit) => (bit === '0' ? '+' : '*'));
    combinations.push(operators.join(''));
  }

  return combinations;
}

export function handleEquation(equation: Equations): number {
  const operators = generateOperatorCombinations(equation.inputs.length);

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

export function processStringPart1(input: string): number {
  const equations = mapInput(input);
  let total = 0;

  for (const equation of equations) {
    total += handleEquation(equation);
  }

  return total;
}

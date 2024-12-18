type Registers = Record<string, number>;
interface Computer {
  registers: Registers;
  program: number[];
  output: number[];
  instructionPointer: number;
}

const registerPattern = /Register ([ABC]): (\d+)/g;
const programPattern = /Program: ([\d,]+)/;

export function parseInput(input: string): Computer {
  const registers: Registers = {
    A: 0,
    B: 0,
    C: 0,
  };

  const registerMatches = [...input.matchAll(registerPattern)];
  registerMatches.forEach((match) => {
    registers[match[1]] = parseInt(match[2]);
  });

  // Extract program
  const programMatch = input.match(programPattern);
  const program = programMatch ? programMatch[1].split(',').map(Number) : [];

  return {
    registers,
    program,
    output: [],
    instructionPointer: 0,
  };
}

function getComboOperand(registers: Registers, operand: number): number {
  if (operand <= 3) {
    return operand;
  }

  if (operand === 4) {
    return registers.A;
  }

  if (operand === 5) {
    return registers.B;
  }

  if (operand === 6) {
    return registers.C;
  }

  return operand;
}

function adv(registers: Registers, operand: number) {
  const numerator = registers.A;
  const denominator = Math.pow(2, getComboOperand(registers, operand));
  registers.A = Math.floor(numerator / denominator);
}

function bxl(registers: Registers, operand: number) {
  registers.B ^= operand;
}

function bst(registers: Registers, operand: number) {
  registers.B = getComboOperand(registers, operand) % 8;
}

function jnz(registers: Registers, operand: number): boolean {
  if (registers.A !== 0) {
    return true;
  }
  return false;
}

function bxc(registers: Registers, operand: number) {
  registers.B ^= registers.C;
}

function out(registers: Registers, operand: number, output: number[]) {
  output.push(getComboOperand(registers, operand) % 8);
}

function bdv(registers: Registers, operand: number) {
  const numerator = registers.A;
  const denominator = Math.pow(2, getComboOperand(registers, operand));
  registers.B = Math.floor(numerator / denominator);
}

function cdv(registers: Registers, operand: number) {
  const numerator = registers.A;
  const denominator = Math.pow(2, getComboOperand(registers, operand));
  registers.C = Math.floor(numerator / denominator);
}

function executeInstruction(computer: Computer): boolean {
  const { registers, program, output, instructionPointer } = computer;

  if (instructionPointer >= program.length) {
    return false;
  }

  const opcode = program[instructionPointer];
  const operand = program[instructionPointer + 1];

  switch (opcode) {
    case 0:
      adv(registers, operand);
      break;
    case 1:
      bxl(registers, operand);
      break;
    case 2:
      bst(registers, operand);
      break;
    case 3:
      if (jnz(registers, operand)) {
        computer.instructionPointer = operand;
        return true;
      }
      break;
    case 4:
      bxc(registers, operand);
      break;
    case 5:
      out(registers, operand, output);
      break;
    case 6:
      bdv(registers, operand);
      break;
    case 7:
      cdv(registers, operand);
      break;
  }

  computer.instructionPointer += 2;
  return true;
}

export function processPart1(input: Computer): string {
  while (executeInstruction(input)) {}
  return input.output.join(',');
}

import * as fs from 'fs';
import * as path from 'path';
import readline from 'readline';

export async function fetchInputStream(filePath: string) {
  const absolutePath = path.resolve(filePath);

  const fileStream = fs.createReadStream(absolutePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return rl;
}

export function fetchFileContent(filePath: string) {
  const absolutePath = path.resolve(filePath);

  return fs.readFileSync(absolutePath, 'utf-8');
}

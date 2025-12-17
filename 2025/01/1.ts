// @ts-nocheck .
import { readFile } from "#io";
const input = readFile(import.meta.dirname, "in.txt");

const instr = input
  .trim()
  .replaceAll("R", "")
  .replaceAll("L", "-")
  .split("\n")
  .map(Number);

function mod(n, m) {
  return ((n % m) + m) % m;
}

let c = 0;

instr.reduce((acc, n) => {
  acc = mod(acc + n, 100);
  if (acc === 0) c++;
  return acc;
}, 50);

console.log(c);

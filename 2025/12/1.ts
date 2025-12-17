// @ts-nocheck .
import { readFile } from "#io";
const input = readFile(import.meta.dirname, "in.txt");

const rules = input.trim().split("\n\n");

const regionSize = rules
  .pop()
  .split("\n")
  .map((l) => l.split(": "));
let shapes = rules.map((l) => l.split("\n"));
shapes.forEach((l) => l.shift());
shapes = shapes.map((l) => l.map((ll) => ll.split("")));

regionSize.forEach((l) => {
  l[0] = l[0].split("x").map(Number);
  l[1] = l[1].split(" ").map(Number);
});

let res = 0;

for (const [size, instr] of regionSize) {
  const targetArea = size[0] * size[1];
  let accArea = 0;
  for (let i = 0; i < instr.length; i++) {
    accArea += 9 * instr[i];
  }
  if (accArea <= targetArea) res++;
}
console.log(res);

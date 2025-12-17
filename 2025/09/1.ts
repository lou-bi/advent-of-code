// @ts-nocheck .
import { readFile } from "#io";
const input = readFile(import.meta.dirname, "in.txt");

const coords = input.trim().split("\n");

function area(ax, ay, bx, by) {
  return (1 + Math.abs(ax - bx)) * (1 + Math.abs(ay - by));
}
const ds = [];
for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    ds.push({
      a: coords[i],
      b: coords[j],
      area: area(...coords[i].split(","), ...coords[j].split(",")),
    });
  }
}

const largest = ds.toSorted((a, b) => b.area - a.area)[0];

console.log(largest.area);

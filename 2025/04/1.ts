// @ts-nocheck .
import { readFile } from "#io";
const input = readFile(import.meta.dirname, "in.txt");

const grid = input
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let r = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "@") {
      let na = 0;
      for (const [ny, nx] of dirs) {
        try {
          if (grid[y + ny][x + nx] === "@") {
            na++;
          }
        } catch {
          continue;
        }
      }
      if (na < 4) r++;
    }
  }
}

console.log(r);

// @ts-nocheck .
import { readFile } from "#io";
const input = readFile(import.meta.dirname, "in.txt");

const grid = input
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const S = [0, grid[0].indexOf("S")];

const cache = {};
function solve(r, c) {
  const k = JSON.stringify(`${r}:${c}`);
  if (k in cache) return cache[k];
  if (r >= grid.length) {
    cache[k] = 1;
  } else if (grid[r][c] === ".") {
    cache[k] = solve(r + 1, c);
  } else if (grid[r][c] === "^") {
    cache[k] = solve(r, c - 1) + solve(r, c + 1);
  }
  return cache[k];
}
const res = solve(1, S[1]);
console.log(res);

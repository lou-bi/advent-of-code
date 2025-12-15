// @ts-nocheck .
const input = Deno.readTextFileSync("in.txt");

const coords = input
  .trim()
  .split("\n")
  .map((l) => l.split(",").map(Number));
coords.push(coords[0]);
console.log(coords);
let sx = 0;
let sy = 0;

for (let i = 0; i < coords.length - 1; i++) {
  sx += coords[i][0] + coords[i + 1][1];
  sy += coords[i][1] + coords[i + 1][0];
}

console.log(sx * sy);

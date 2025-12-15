// @ts-nocheck .
const input = Deno.readTextFileSync("in.txt");

const coords = input.trim().split("\n");

function euc(ax, ay, bx, by) {
  return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}
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

console.log(largest);

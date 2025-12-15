// @ts-nocheck .
const input = Deno.readTextFileSync("in.txt");

const network = input
  .trim()
  .split("\n")
  .map((l) => l.split(":").map((ll) => ll.trim()));

const g = new Map();

for (const el of network) {
  g.set(el[0], { next: el[1].split(" ") });
}

const c = {};

function traverse(from, to) {
  const k = JSON.stringify(from);
  if (k in c) return c[k];
  if (from === to) return 1;
  let t = 0;
  for (const n of g.get(from).next) t += traverse(n, to);
  c[k] = t;
  return t;
}

console.log(traverse("you", "out"));

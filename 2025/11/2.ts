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
function traverse(from, to, sawDAC = false, sawFFT = false) {
  const k = JSON.stringify([from, to, sawDAC, sawFFT]);
  if (k in c) return c[k];
  if (from === to) return sawDAC && sawFFT ? 1 : 0;
  if (from === "dac") sawDAC = true;
  else if (from === "fft") sawFFT = true;
  let t = 0;
  for (const n of g.get(from).next) t += traverse(n, to, sawDAC, sawFFT);
  c[k] = t;
  return t;
}

console.log(traverse("svr", "out"));

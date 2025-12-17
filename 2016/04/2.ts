import { readFile, readLines } from "#io";
import { range } from "#iter";

const alpha = "abcdefghijklmnopqrstuvwxyz";
const mod = 26;
for await (const line of readLines(import.meta.dirname, "in.txt")) {
  const m = line.match(/([a-z\-]+)(\d+)\[([a-z]+)\]$/);
  let s = m[1];
  let offset = Number(m[2]);
  let ns = "";
  for (const c of s) {
    if (c === "-") {
      ns += " ";
      continue;
    }
    ns += alpha[(alpha.indexOf(c) + offset) % mod];
  }
  if (ns.includes("northpole object storage")) console.log(ns, offset);
}

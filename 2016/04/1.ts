import { readFile, readLines } from "#io";

let res = 0;
for await (const line of readLines(import.meta.dirname, "in.txt")) {
  const m = line.match(/([a-z-]+)(\d+)\[([a-z]+)\]$/);
  const name = m[1];
  const id = Number(m[2]);
  const checkSum = m[3];

  const sumCharMap = {};
  for (const c of name) {
    if (!checkSum.includes(c)) continue;
    sumCharMap[c] = (sumCharMap[c] || 0) + 1;
  }

  const calculatedSum = Object.entries(sumCharMap)
    .sort(([la, ca], [lb, cb]) => la.localeCompare(lb))
    .sort(([la, ca], [lb, cb]) => cb - ca)
    .reduce((acc, el) => (acc += el[0]), "");

  const valid = checkSum === calculatedSum;
  if (valid) res += id;
  // console.log(valid, checkSum, calculatedSum);
}
console.log(res);

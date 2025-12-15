import { fetchHome } from "./utils.ts";

const a = await fetchHome().then((r) => r.text());
const r = a.match(/"Day .+?"/g);
if (!r) {
  console.error("Error: no match");
  Deno.exit(1);
}
const res = r.reduce((acc, el) => {
  const m = el.match(/(\d+)(?:.+(\w{3}) star)?/);
  if (!m) {
    console.error("Error: no match after parsing");
    Deno.exit(1);
  }
  console.log(m);
  const [_, __, stars] = m;
  acc.push(stars === "one" ? 1 : stars === "two" ? 2 : 0);
  return acc;
}, [] as number[]);

res.forEach((el, i) => {
  console.log(
    `Day ${i + 1}\t: <span style="color: #FFFF66">${"*".repeat(el)}</span>`
  );
});
console.log(res);

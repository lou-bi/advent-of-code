import { fetchHome } from "./utils.ts";
const [year] = Deno.args;
if (!year) {
  console.error("Missing arg: year");
  Deno.exit(1);
}

const a = await fetchHome(year).then((r) => r.text());
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
  const [_, __, stars] = m;
  acc.push(stars === "one" ? 1 : stars === "two" ? 2 : 0);
  return acc;
}, [] as number[]);

const total = res.reduce((acc, el) => acc + el);

let readme = `## ${year}\n### Total: ${total}/${res.length * 2}  \n`;
res.forEach((el, i) => {
  const d = i + 1;
  readme += `[Day ${
    d < 10 ? "&nbsp;&nbsp;" : ""
  }${d}: ](https://adventofcode.com/${year}/day/${d})${"⭐".repeat(el)}  \n`;
});

await Deno.writeTextFile(`${year}/README.md`, readme);

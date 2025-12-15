const input = Deno.readTextFileSync("./in.txt");

const lines = input
  .trim()
  .split("\n")
  .map((l) => l.split("").map(Number));

let r = 0;

for (const line of lines) {
  let fi = 0;
  const acc = [];

  for (let max = 11; max >= 0; max--) {
    let f = 0;
    for (let i = fi; i < line.length - max; i++) {
      if (line[i] > f) {
        f = line[i];
        fi = i + 1;
      }
    }
    acc.push(f);
  }
  r += +acc.join("");
}

console.log(r);

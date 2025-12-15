// @ts-nocheck bla
const input = Deno.readTextFileSync("in.txt");

const grid = input
  .trim()
  .split("\n")
  .map((l) => l.split(""));
grid[1][grid[0].indexOf("S")] = "|";

let res = 0;
for (let i = 2; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === "^") {
      if (grid[i - 1][j] === "|") {
        res++;
        let offset = 0;
        try {
          while (grid[i + offset][j - 1] !== "^") {
            grid[i + offset][j - 1] = "|";
            offset++;
          }
        } catch {}
        try {
          offset = 0;
          while (grid[i + offset][j + 1] !== "^") {
            grid[i + offset][j + 1] = "|";
            offset++;
          }
        } catch {}
      }
    }
  }
}

console.log(res);

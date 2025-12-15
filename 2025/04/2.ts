const input = Deno.readTextFileSync("in.txt");

const grid = input
  .trim()
  .split("\n")
  .map((l) => l.split(""));

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let r = 0;

function recurs(state = grid) {
  const newState = [];
  let tna = 0;
  for (let y = 0; y < state.length; y++) {
    const newLine = [];
    for (let x = 0; x < state[y].length; x++) {
      if (state[y][x] === "@") {
        let na = 0;
        for (const [ny, nx] of dirs) {
          try {
            if (state[y + ny][x + nx] === "@") {
              na++;
            }
          } catch {
            continue;
          }
        }
        if (na < 4) {
          newLine.push("X");
          tna++;
          continue;
        }
      }
      newLine.push(state[y][x]);
    }
    newState.push(newLine);
  }
  r += tna;
  if (tna) recurs(newState);
}
recurs();
console.log(r);

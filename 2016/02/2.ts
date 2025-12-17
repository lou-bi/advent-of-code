// @ts-nocheck .
import { readFile, readLines } from "#io";

const nextPos = {
  "1": { U: "1", R: "1", D: "3", L: "1" },
  "2": { U: "2", R: "3", D: "6", L: "2" },
  "3": { U: "1", R: "4", D: "7", L: "2" },
  "4": { U: "4", R: "4", D: "8", L: "3" },
  "5": { U: "5", R: "6", D: "5", L: "5" },
  "6": { U: "2", R: "7", D: "A", L: "5" },
  "7": { U: "3", R: "8", D: "B", L: "6" },
  "8": { U: "4", R: "9", D: "C", L: "7" },
  "9": { U: "9", R: "9", D: "9", L: "8" },
  A: { U: "6", R: "B", D: "A", L: "A" },
  B: { U: "7", R: "C", D: "D", L: "A" },
  C: { U: "8", R: "C", D: "C", L: "B" },
  D: { U: "B", R: "D", D: "D", L: "D" },
};

let pos = 5;
let code = "";
for await (const line of readLines(import.meta.dirname, "test.txt")) {
  const instr = line.split("");
  for (const d of instr) {
    pos = nextPos[pos][d];
  }
  code += pos;
}
console.log(code);

/** Used to generate nextPos */
// const pad = `
//   1
//  234
// 56789
//  ABC
//   D
// `.split("\n");
// const dirs = {
//   U: [-1, 0],
//   R: [0, 1],
//   D: [1, 0],
//   L: [0, -1],
// };
// for (let y = 0; y < pad.length; y++) {
//   for (let x = 0; x < pad[y].length; x++) {
//     if (pad[y][x] !== " ") {
//       nextPos[pad[y][x]] = {};
//       for (const dir in dirs) {
//         const v = dirs[dir];
//         const ny = v[0] + y;
//         const nx = v[1] + x;
//         if (ny >= 0 && nx >= 0 && pad[ny][nx] && pad[ny][nx] !== " ") {
//           nextPos[pad[y][x]][dir] = pad[ny][nx];
//         } else {
//           nextPos[pad[y][x]][dir] = pad[y][x];
//         }
//       }
//     }
//   }
// }
// console.log(nextPos);

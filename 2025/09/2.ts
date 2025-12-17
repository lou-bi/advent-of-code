// @ts-nocheck .
import { printCoords, readFile } from "#io";
import { range } from "#iter";
const input = readFile(import.meta.dirname, "in.txt");

const coords = input
  .trim()
  .split("\n")
  .map((l) => l.split(",").map(Number));
const [xs, ys] = coords
  .reduce(
    (acc, [x, y]) => {
      acc[0].add(x);
      acc[1].add(y);
      return acc;
    },
    [new Set(), new Set()]
  )
  .map((s) => Array.from(s));

xs.sort((a, b) => a - b);
ys.sort((a, b) => a - b);

let compressed = new Array(ys.length * 2 - 1).fill(0);
compressed = compressed.map((_) => new Array(xs.length * 2 - 1).fill(0));
/** 0011111
    0010001
    1110001
    1000001
    1111101
    0000101
    0000111 */
for (let i = 0; i < coords.length; i++) {
  // see https://www.youtube.com/watch?v=toDrFDh7VNs
  // this is to connect last and first point
  let ip1 = i + 1 === coords.length ? 0 : i + 1;

  const [x1, y1] = coords[i];
  const [x2, y2] = coords[ip1];
  const [cx1, cx2] = [xs.indexOf(x1) * 2, xs.indexOf(x2) * 2].sort(
    (a, b) => a - b
  );
  const [cy1, cy2] = [ys.indexOf(y1) * 2, ys.indexOf(y2) * 2].sort(
    (a, b) => a - b
  );
  for (const cx of range(cx1, cx2 + 1)) {
    for (const cy of range(cy1, cy2 + 1)) {
      compressed[cx][cy] = 1;
    }
  }
}
// printCoords(compressed);
// console.log(compressed);
// process.exit();
const start = [-1, -1];
const outsideSet = new Set();
const q = [start];
outsideSet.add(JSON.stringify(start));

while (q.length > 0) {
  const [tx, ty] = q.shift();
  for (const [nx, ny] of [
    [tx - 1, ty],
    [tx + 1, ty],
    [tx, ty - 1],
    [tx, ty + 1],
  ]) {
    if (outsideSet.has(JSON.stringify([nx, ny]))) {
      continue;
    }
    if (
      nx < -1 ||
      ny < -1 ||
      nx > compressed.length ||
      ny > compressed[0].length
    ) {
      continue;
    }
    if (
      nx >= 0 &&
      nx < compressed.length &&
      ny >= 0 &&
      ny < compressed[0].length &&
      compressed[nx][ny] === 1
    ) {
      continue;
    }
    outsideSet.add(JSON.stringify([nx, ny]));
    q.push([nx, ny]);
  }
}
const outside = [];
for (const k of outsideSet.keys()) outside.push(JSON.parse(k));

// printCoords(coords);
// compressed.map((x) => console.log(x.join("")));

for (let i = 0; i < compressed.length; i++) {
  for (let j = 0; j < compressed[0].length; j++) {
    if (!outsideSet.has(JSON.stringify([j, i]))) compressed[j][i] = 1;
  }
}
// console.log();
// compressed.map((x) => console.log(x.join("")));
/** 
Encoding of the area.
Any coordinate is the bottom right corner area value of the rectangle above left.
0       0       1       2       3       4       5
0       0       2       4       6       8       10
1       2       5       8       11      14      17
2       4       8       12      16      20      24
3       6       11      16      21      26      31
3       6       11      16      22      28      34
3       6       11      16      23      30      37
 */
const psa = [...new Array(compressed.length)].map(() =>
  new Array(compressed[0].length).fill(0)
);
for (const x of range(psa.length)) {
  for (const y of range(psa[0].length)) {
    const left = x > 0 ? psa[x - 1][y] : 0;
    const top = y > 0 ? psa[x][y - 1] : 0;
    const topLeft = x > 0 && y > 0 ? psa[x - 1][y - 1] : 0;
    // topLeft is because the area is contained twice in top and left,
    // so we need to cancel it
    psa[x][y] = left + top - topLeft + compressed[x][y];
  }
}

// console.log();
// psa.map((x) => console.log(x.join("\t")));

function valid(x1, y1, x2, y2) {
  const [cx1, cx2] = [xs.indexOf(x1) * 2, xs.indexOf(x2) * 2].sort(
    (a, b) => a - b
  );
  const [cy1, cy2] = [ys.indexOf(y1) * 2, ys.indexOf(y2) * 2].sort(
    (a, b) => a - b
  );
  const left = cx1 > 0 ? psa[cx1 - 1][cy2] : 0;
  const top = cy1 > 0 ? psa[cx2][cy1 - 1] : 0;
  const topLeft = cx1 > 0 && cy1 > 0 ? psa[cx1 - 1][cy1 - 1] : 0;
  const count = psa[cx2][cy2] - left - top + topLeft;
  return count === (cx2 - cx1 + 1) * (cy2 - cy1 + 1);
}

function area(ax, ay, bx, by) {
  return (1 + Math.abs(ax - bx)) * (1 + Math.abs(ay - by));
}
let maxArea = 0;
for (let i = 0; i < coords.length; i++) {
  const [x1, y1] = coords[i];
  for (let j = i + 1; j < coords.length; j++) {
    const [x2, y2] = coords[j];
    if (valid(x1, y1, x2, y2)) {
      const na = area(x1, y1, x2, y2);
      if (na > maxArea) maxArea = na;
    }
  }
}

console.log(maxArea);

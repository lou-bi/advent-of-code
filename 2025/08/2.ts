// @ts-nocheck .
const input = Deno.readTextFileSync("in.txt");

const coords = input.trim().split("\n");

function euc(ax, ay, az, bx, by, bz) {
  return Math.sqrt(
    Math.pow(ax - bx, 2) + Math.pow(ay - by, 2) + Math.pow(az - bz, 2)
  );
}

const ds = [];
for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    ds.push({
      a: coords[i],
      b: coords[j],
      d: euc(...coords[i].split(","), ...coords[j].split(",")),
    });
  }
}

ds.sort((a, b) => a.d - b.d);

let ns = [];
main: for (const { a, b } of ds) {
  let found = false;
  let foundAt = -1;
  for (let i = 0; i < ns.length; i++) {
    const n = ns[i];
    if (n.has(a) || n.has(b)) {
      if (!found) {
        n.add(a).add(b);
        found = true;
        foundAt = i;
      } else {
        ns[foundAt] = ns[foundAt].union(n);
        n.clear();
      }
    }
    if (ns.some((n) => n.size === coords.length)) {
      console.log("found");
      const x1 = a.split(",")[0];
      const x2 = b.split(",")[0];
      console.log(x1 * x2);
      break main;
    }
  }

  if (!found) ns.push(new Set([a, b]));
  ns = ns.filter((n) => n.size);
}

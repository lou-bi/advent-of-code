const input = Deno.readTextFileSync("in.txt");
const lines = input
  .trim()
  .replaceAll("R", "")
  .replaceAll("L", "-")
  .split("\n")
  .map(Number);
let c = 0;
let p = 50;

for (let el in lines) {
  while (el !== 0) {
    p = mod(p - Math.sign(el), 100);
    if (p === 0) c++;
    el -= Math.sign(el);
  }
  console.log(p);
}

console.log("\ncccc");
console.log(c);

function mod(n, m) {
  return ((n % m) + m) % m;
}

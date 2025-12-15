const input = Deno.readTextFileSync("in.txt");

const instr = input
  .trim()
  .replaceAll("R", "")
  .replaceAll("L", "-")
  .split("\n")
  .map(Number);

let dialPos = 50;
let c = 0;
for (const el of instr) {
  const incr = Math.sign(el);
  for (let i = 0; i < Math.abs(el); i++) {
    dialPos += incr;
    if (dialPos % 100 === 0) c++;
  }
}
console.log(c);

// @ts-nocheck bla
const rinput = Deno.readTextFileSync("in.txt");

const input = rinput.split("\n").map((l) => l.replaceAll(/\s+/g, " ").trim());

const operators = input.pop().split(" ");
const nums = input.map((l) => l.split(" ").map(Number));

const op = {
  "*": (a, b) => a * b,
  "+": (a, b) => a + b,
};

let res = 0;

for (let i = 0; i < operators.length; i++) {
  let tr = op[operators[i]](nums[0][i], nums[1][i]);
  for (let j = 2; j < nums.length; j++) {
    const row = nums[j];
    console.log(op[operators[i]], tr, nums[j][i]);
    tr = op[operators[i]](tr, nums[j][i]);
    console.log(tr);
  }
  console.log();
  res += tr;
}

console.log(res);

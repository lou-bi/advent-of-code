// @ts-nocheck .
const input = Deno.readTextFileSync("in.txt");

const rules = input.trim();

let shapes = [];
const reg = [];

let tmp = [];
for (const line of rules.split("\n")) {
  switch (line.length) {
    case 2: {
      break;
    }
    case 3: {
      tmp.push(line);
      break;
    }
    case 0: {
      shapes.push(tmp);
      tmp = [];
      break;
    }
    default: {
      const l = line.split(": ");
      l[0] = l[0].split("x").map(Number);
      l[1] = l[1].split(" ").map(Number);
      reg.push(l);
    }
  }
}
shapes = shapes.map((l) =>
  l.join("").replaceAll("#", "1").replaceAll(".", "0")
);
const rotate = (s) =>
  `${s[6]}${s[3]}${s[0]}${s[7]}${s[4]}${s[1]}${s[8]}${s[5]}${s[2]}`;

const shapesWithRotations = shapes.map((s) => {
  const r180 = rotate(rotate(s));
  return s === r180 ? [s, rotate(s)] : [s, rotate(s), r180, rotate(r180)];
});

for (const [[x, y], instr] of reg) {
  let world = "0".repeat(x * y);
  const copyWorld = world;
  const stack = [];
  for (let shapeId = 0; shapeId < instr.length; shapeId++) {
    for (let i = 0; i < instr[shapeId]; i++) {
      stack.push(shapeId);
    }
  }
  console.log("====base world:");
  console.log(world);
  console.log(`stack:`, stack);
  for (const shapeIndex of stack) {
    ////////// todo, compare all
    for (const rot of shapesWithRotations[shapeIndex]) {
      console.log("trying rotation", rot);
      for (let i = 0; i <= copyWorld.length - rot.length; i++) {
        let mask =
          copyWorld.slice(0, i) +
          shapeInWorld(rot, x) +
          copyWorld.slice(rot.length, copyWorld.length - i);
        // check mask
        const bWorld = parseInt(world, 2);
        const bShape = parseInt(mask, 2);
        if ((bWorld ^ bShape) === bWorld + bShape) {
          console.log("ok");
          world = bWorld ^ bShape;
        }
      }
    }
    //////////
  }
}

function shapeInWorld(s, x) {
  return (
    s.slice(0, 3) +
    "0".repeat(x - 3) +
    s.slice(3, 6) +
    "0".repeat(x - 3) +
    s.slice(6, 9)
  );
}

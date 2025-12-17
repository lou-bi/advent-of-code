// @ts-nocheck .
import { readFile } from '#io'

const rinput = readFile(import.meta.dirname, 'in.txt')

const input = rinput.split('\n')

const op = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
}

const opLine = input.pop()
const bitOps = []
let _isCounting = false
let bo
for (const char of opLine) {
  if (char === '+' || char === '*') {
    if (bo) bitOps.push(bo)
    bo = { op: op[char], c: 0, o: char }
    _isCounting = true
  } else {
    bo.c++
  }
}
bo.c++
bitOps.push(bo)

const nums = []

for (const line of input) {
  const num = []
  let lastI = 0
  for (const bo of bitOps) {
    num.push(line.slice(lastI, lastI + bo.c))
    lastI += bo.c + 1
  }
  nums.push(num)
}

const nunums = []
for (let col = 0; col < bitOps.length; col++) {
  const stackNum = []
  let index = bitOps[col].c - 1
  while (index >= 0) {
    const nn = []
    for (const line of nums) {
      nn.push(line[col][index])
    }
    stackNum.push(nn)
    index--
  }
  nunums.push(stackNum)
}

let res = 0

for (let i = 0; i < nunums.length; i++) {
  const c = eval(nunums[i].map((n) => n.join('').trim()).join(bitOps[i].o))
  res += c
}
console.log(res)

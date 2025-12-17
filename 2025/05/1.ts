// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')

const [rfreshs, rava] = input
  .trim()
  .split('\n\n')
  .map((l) => l.split('\n'))

const freshs = rfreshs.map((l) => l.split('-').map(Number))
const ava = rava.map(Number)

let res = 0
for (const a of ava) {
  for (const [min, max] of freshs) {
    if (a <= max && a >= min) {
      res++
      break
    }
  }
}

console.log(res)

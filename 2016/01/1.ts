// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt').split(', ')

const toDirs = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' },
}
const dirs = {
  N: 0,
  E: 0,
  S: 0,
  W: 0,
}
let cd = 'N'
for (const l of input) {
  cd = toDirs[cd][l[0]]
  dirs[cd] += Number(l.slice(1))
}
const n = dirs.N - dirs.S
const e = dirs.E - dirs.W

console.log(n + e)

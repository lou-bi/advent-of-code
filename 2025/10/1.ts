// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')
//////////////////// parse input as binary
const sets = input
  .split('\n')
  .map((l) => l.match(/^\[(.+)\] (.+?) \{(.+)\}$/))
  .map((m) => [
    parseInt(
      m[1]
        .split('')
        .map((x) => (x === '#' ? 1 : 0))
        .join(''),
      2,
    ),
    m[2]
      .replaceAll(/[()]/g, '')
      .split(' ')
      .map((btn) => {
        const b = '0'.repeat(m[1].length).split('')
        btn.split(',').map((_x) => {
          for (const x of btn) {
            b[x] = '1'
          }
        })
        return parseInt(b.join(''), 2)
      }),
    // m[3],
  ])
//////////////////// recursively try all xor
let res = 0
const _maxPress = 10
for (const [r, bs] of sets) res += findXOR(r, bs)

function findXOR(target, buttons, previousStates = [0], p = 1) {
  if (p > 10) return 0
  const newStates = []
  for (const ps of previousStates) {
    for (const b of buttons) {
      const newState = ps ^ b
      if (newState === target) {
        return p
      }
      newStates.push(newState)
    }
  }
  const pressMore = findXOR(target, buttons, newStates, p + 1)
  if (pressMore) return pressMore
  return 0
}

console.log(res)

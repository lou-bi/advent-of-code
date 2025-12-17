// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')

const [rfreshs] = input
  .trim()
  .split('\n\n')
  .map((l) => l.split('\n'))

const freshs = rfreshs
  .map((l) => l.split('-').map(Number))
  .toSorted((a, b) => a[0] - b[0])

let res = 0
let lastSeen = null
for (const [low, high] of freshs) {
  if (!lastSeen) lastSeen = [low, high]
  else if (lastSeen[1] < low) {
    res += lastSeen[1] - lastSeen[0] + 1
    lastSeen = [low, high]
  } else {
    lastSeen = [lastSeen[0], Math.max(high, lastSeen[1])]
  }
}
res += lastSeen[1] - lastSeen[0] + 1
console.log(res)

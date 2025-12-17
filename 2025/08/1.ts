// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')

const coords = input.trim().split('\n')

function euc(ax, ay, az, bx, by, bz) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)
}

const ds = []
for (let i = 0; i < coords.length; i++) {
  for (let j = i + 1; j < coords.length; j++) {
    ds.push({
      a: coords[i],
      b: coords[j],
      d: euc(...coords[i].split(','), ...coords[j].split(',')),
    })
  }
}

ds.sort((a, b) => a.d - b.d)

let ns = []

for (const { a, b } of ds.splice(0, 1000)) {
  let found = false
  let foundAt = -1
  for (let i = 0; i < ns.length; i++) {
    const n = ns[i]
    if (n.has(a) || n.has(b)) {
      if (!found) {
        n.add(a).add(b)
        found = true
        foundAt = i
      } else {
        ns[foundAt] = ns[foundAt].union(n)
        n.clear()
        break
      }
    }
  }
  if (!found) ns.push(new Set([a, b]))
  ns = ns.filter((n) => n.size)
}
const NS = ns.sort((a, b) => b.size - a.size)
const MNS = [...NS.values()].slice(0, 3).reduce((acc, n) => acc * n.size, 1)

console.log(MNS)

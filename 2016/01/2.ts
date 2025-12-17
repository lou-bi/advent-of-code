// @ts-nocheck .
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt').split(', ')

const dirsToCoords = {
  N: [1, 0],
  E: [0, 1],
  S: [-1, 0],
  W: [0, -1],
}

const toDirs = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' },
}

let cd = 'N'
let pos = [0, 0]
const visited = new Set()
visited.add(JSON.stringify(pos))

main: for (const l of input) {
  const na = toDirs[cd][l[0]]
  cd = na
  const c = dirsToCoords[cd]
  const d = Number(l.slice(1))

  for (let i = 0; i < d; i++) {
    pos = [pos[0] + c[0], pos[1] + c[1]]
    const k = JSON.stringify(pos)
    if (visited.has(k)) {
      console.log(pos[0] + pos[1])
      break main
    }
    visited.add(k)
  }
}

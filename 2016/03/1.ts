// @ts-nocheck .
import { readLines } from '#io'

let res = 0
let rows = []
for await (const line of readLines(import.meta.dirname, 'in.txt')) {
  if (rows.length < 3) {
    const m = line.match(/^(?:\s+)?(\d+)\s+(\d+)\s+(\d+)$/)
    const n1 = Number(m[1])
    const n2 = Number(m[2])
    const n3 = Number(m[3])
    rows.push([n1, n2, n3])
  }
  if (rows.length === 3) {
    if (
      rows[0][0] + rows[1][0] > rows[2][0] &&
      rows[0][0] + rows[2][0] > rows[1][0] &&
      rows[2][0] + rows[1][0] > rows[0][0]
    ) {
      res++
    }
    if (
      rows[0][1] + rows[1][1] > rows[2][1] &&
      rows[0][1] + rows[2][1] > rows[1][1] &&
      rows[2][1] + rows[1][1] > rows[0][1]
    ) {
      res++
    }
    if (
      rows[0][2] + rows[1][2] > rows[2][2] &&
      rows[0][2] + rows[2][2] > rows[1][2] &&
      rows[2][2] + rows[1][2] > rows[0][2]
    ) {
      res++
    }
    rows = []
  }
}

console.log(res)

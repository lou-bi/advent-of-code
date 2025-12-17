import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')
const ranges = input.split(',')

let res = 0

for (const r of ranges) {
  const [min, max] = r.split('-').map(Number)
  for (let i = min; i <= max; i++) {
    if (/^(\d+)\1$/.test(i.toString())) res += i
  }
}

console.log(res)

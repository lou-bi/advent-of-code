import { createReadStream, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createInterface } from 'node:readline'

export function readLines(dir: string, file: string) {
  return createInterface({
    input: createReadStream(join(dir, file)),
  })
}
export function readFile(dir: string, file: string) {
  return readFileSync(join(dir, file), 'utf8')
}

export function printCoords(coords: string[]) {
  const printer = new Array(9)

  for (let i = 0; i < printer.length; i++) {
    printer[i] = new Array(14).fill('.')
  }
  for (const [i, j] of coords) {
    printer[j][i] = '#'
  }
  console.log(printer.map((x) => x.join('')).join('\n'))
  console.log()
}

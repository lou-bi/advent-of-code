// @ts-nocheck .
import { readFile, readLines } from '#io'

for await (const _line of readLines(import.meta.dirname, 'test.txt')) {
  //
}

const _input = readFile(import.meta.dirname, 'test.txt')

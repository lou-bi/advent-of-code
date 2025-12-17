import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { fetchInput } from './utils/network.ts'

const year = process.argv[2]
const day = process.argv[3]
if (!year) {
  console.error('Missing arg: year')
  process.exit(1)
}
if (!day) {
  console.error('Missing arg: day')
  process.exit(1)
}
if (fs.existsSync(`${year}/${day}`)) {
  console.log(`Already exists: ${year}/${day}`)
  process.exit(0)
}

const [input, template] = await Promise.all([
  fetchInput(year, day).then((r) => r.text()),
  fsPromises.readFile(`${import.meta.dirname}/utils/template.ts`, 'utf8'),
])
const stringDay = day.toString().padStart(2, '0')
if (fs.existsSync(year)) {
  fs.mkdirSync(`${year}/${stringDay}`)
  await Promise.all([
    fsPromises.writeFile(`${year}/${stringDay}/test.txt`, ''),
    fsPromises.writeFile(`${year}/${stringDay}/in.txt`, input),
    fsPromises.writeFile(`${year}/${stringDay}/1.ts`, template),
    fsPromises.writeFile(`${year}/${stringDay}/2.ts`, template),
  ])
  console.log(`Successfully scaffolded ${year}/${stringDay}`)
} else {
  console.error(`${year} folder missing. Not implemented.`)
}

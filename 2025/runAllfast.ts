import fs from 'node:fs'
import { performance } from 'node:perf_hooks'

function getAllFiles(dirPath: string) {
  const folders = fs
    .readdirSync(dirPath)
    .filter((s) => fs.statSync(s).isDirectory())
  const files = folders
    .flatMap((folder) =>
      fs.readdirSync(folder).map((ff) => `${dirPath}/${folder}/${ff}`),
    )
    .filter((f) => /\.ts$/.test(f))

  return files
}
function parseDayPart(path: string) {
  const [_, s] = path.split(import.meta.dirname)
  const [__, day, part] = s.split('/')
  return `Day ${day}, part ${part.replace('.ts', '')}`
}
async function run() {
  const files = getAllFiles(import.meta.dirname)
  for (const file of files) {
    process.stdout.write(`${parseDayPart(file)}... `)

    const start = performance.now()

    try {
      // DYNAMIC IMPORT: This runs the file immediately without a new process
      // We append a timestamp query to bypass internal caching if you run this multiple times
      await import(`${file}?t=${Date.now()}`)

      const end = performance.now()
      const duration = (end - start).toFixed(2)

      console.log(`Took ${duration}ms`)
    } catch (err) {
      console.log(`❌ Failed`)
      console.error(err)
    }
  }
}

run()

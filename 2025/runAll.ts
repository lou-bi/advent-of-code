import { execFile } from 'node:child_process'
import fs from 'node:fs'

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
try {
  const tsFiles = getAllFiles(import.meta.dirname)

  if (tsFiles.length === 0) {
    console.log('No .ts files found.')
    process.exit(0)
  }

  tsFiles.forEach((filePath) => {
    try {
      execFile('node', [filePath], (error, stdout, _stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(parseDayPart(filePath), ':', stdout)
        // console.error(`stderr: ${stderr}`);
      })
      // const r = execSync(`node "${filePath}"`, { encoding: "utf-8" });
      // console.log(parseDayPart(filePath), ":", r);
    } catch (error) {
      console.error(`❌ Error executing ${filePath}:`)
      console.error(error.message)
    }
  })
} catch (err) {
  console.error('Fatal Error:', err)
}

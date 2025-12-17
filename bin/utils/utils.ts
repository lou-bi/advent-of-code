import { fecthAoc } from './network.ts'

export const BASE_URL = 'https://adventofcode.com'

export async function getAvailableYears() {
  let currentYear = new Date().getFullYear()
  if (!(await fecthAoc(`${BASE_URL}/${currentYear}`).then((r) => r.ok))) {
    currentYear--
  }
  const r = []
  for (let i = 2015; i <= currentYear; i++) {
    r.push(i)
  }
  return r
}

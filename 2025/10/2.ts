// @ts-nocheck .

import { init } from 'z3-solver'
import { readFile } from '#io'

const input = readFile(import.meta.dirname, 'in.txt')
//////////////////// build matrices constraints
const sets = input
  .split('\n')
  .map((l) => l.match(/^\[(.+)\] (.+?) \{(.+)\}$/))
  .map((m) => {
    const target = m[3].split(',').map(Number)
    const tn = target.length
    const matricesIndexes = m[2]
      .replaceAll(/[()]/g, '')
      .split(' ')
      .map((x) => x.split(',').map(Number))
    const matrices = []
    for (const ixs of matricesIndexes) {
      const baseArray = new Array(tn)
      baseArray.fill(0)
      for (const i of ixs) {
        baseArray[i] = 1
      }
      matrices.push(baseArray)
    }
    return [target, matrices]
  })
////////////////////
let res = 0n

const { Context } = await init()
const z3 = new Context('main')
const Z3_ZERO = z3.Int.val(0)
for (const [target, matrice] of sets) {
  const o = new z3.Optimize()
  // create variables like n0, n1... corresponding to buttons
  const vars = matrice.map((_, i) => z3.Int.const(`n${i}`))
  // tell Z3 that all component are positive integer
  o.add(...vars.flatMap((v) => [v.ge(0)]))
  // now that im at it, i think i might actually not need matrices as
  // [0 0 0 1] etc, but rather keep the (1 3), but anyway
  for (let i = 0; i < target.length; i++) {
    const _jolt = target.length
    const impactfulVars = []
    for (let j = 0; j < matrice.length; j++) {
      if (matrice[j][i] === 1) impactfulVars.push(vars[j])
    }
    o.add(impactfulVars.reduce((acc, v) => acc.add(v), Z3_ZERO).eq(target[i]))
  }
  // Tells Z3 to get the lowest value possible of n1 +...+ nx, meaning:
  // the lowest values of all components.
  const SumConstraint = vars.reduce((acc, v) => acc.add(v), Z3_ZERO)
  o.minimize(SumConstraint)

  await o.check()
  const m = o.model()
  const solution = m.eval(SumConstraint).value()
  res += solution
  // console.log(o.toString());
}
console.log(Number(res))

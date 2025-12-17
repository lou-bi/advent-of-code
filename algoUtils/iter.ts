export function* zip(...args: any[]) {
  const max = Math.min(...args.map((a) => a.length));
  const n = args.length;
  for (let i = 0; i < max; i++) {
    let r = new Array(n);
    for (let j = 0; j < n; j++) {
      r[j] = args[j][i];
    }
    yield r;
  }
}
export function* range(min: number, max?: number) {
  const rmin = max ? min : 0;
  const rmax = max || min;

  for (let i = rmin; i < rmax; i++) {
    yield i;
  }
}

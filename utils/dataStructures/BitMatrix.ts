/** Use this for 2 dimensional array of booleans */
export class BitMatrix {
  rows: number
  cols: number
  data: Uint32Array
  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols

    // Calculate total bits needed
    const totalBits = rows * cols

    // Allocate Uint32Array
    // We use (totalBits + 31) >> 5 to simulate Math.ceil(totalBits / 32)
    this.data = new Uint32Array((totalBits + 31) >> 5)
  }

  set(row: number, col: number, value: boolean) {
    // 1. Calculate the flat index (0 to totalBits)
    const index = row * this.cols + col

    // 2. Find the Bucket (Integer) and the Bit position
    // ">> 5" is fast division by 32
    // "& 31" is fast modulo 32
    const bucket = index >> 5
    const bit = index & 31

    if (value) {
      this.data[bucket] |= 1 << bit // Turn bit ON
    } else {
      this.data[bucket] &= ~(1 << bit) // Turn bit OFF
    }
  }

  get(row: number, col: number) {
    const index = row * this.cols + col
    const bucket = index >> 5
    const bit = index & 31

    // Check if bit is 1 or 0
    return (this.data[bucket] & (1 << bit)) !== 0
  }

  print() {
    for (let r = 0; r < this.rows; r++) {
      let rowStr = ''
      for (let c = 0; c < this.cols; c++) {
        rowStr += this.get(r, c) ? '1 ' : '0 '
      }
      console.log(rowStr)
    }
  }
}

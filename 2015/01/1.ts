// @ts-nocheck .
import { readFile, readLines } from "#io";

for await (const line of readLines(import.meta.dirname, "test.txt")) {
  //
}

const input = readFile(import.meta.dirname, "test.txt");

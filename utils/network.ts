import { BASE_URL } from "./utils.ts";

export function fetchInput(y: string, d: string) {
  return fecthAocWithCreds(`${BASE_URL}/${y}/day/${d}/input`);
}
export function fetchHome(y: string | number) {
  return fecthAocWithCreds(`${BASE_URL}/${y}`);
}
export function fecthAocWithCreds(url: string) {
  return fetch(url, {
    credentials: "include",
    headers: {
      "User-Agent":
        "github.com/lou-bi/advent-of-code by louisbon+aoc@protonmail.com",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Cookie: `session=${Deno.env.get("token")}`,
    },
  });
}
export function fecthAoc(url: string) {
  return fetch(url);
}

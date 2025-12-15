export async function fetchInput(y: string, d: string) {
  return await fetch(`https://adventofcode.com/${y}/day/${d}/input`, {
    credentials: "include",
    headers: {
      "User-Agent":
        "github.com/lou-bi/advent-of-code by louisbon+aoc@protonmail.com",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Cookie: `session=${Deno.env.get("token")}`,
    },
  });
}
export async function fetchHome() {
  return await fetch(`https://adventofcode.com/`, {
    credentials: "include",
    headers: {
      "User-Agent":
        "github.com/lou-bi/advent-of-code by louisbon+aoc@protonmail.com",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Cookie: `session=${Deno.env.get("token")}`,
    },
  });
}

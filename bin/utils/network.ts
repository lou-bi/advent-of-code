import { BASE_URL } from "./utils.ts";
process.loadEnvFile(".env");

export function fetchInput(y: string, d: string) {
  return fecthAocWithCreds(`${BASE_URL}/${y}/day/${d}/input`);
}
export function fetchHome(y: string | number) {
  return fecthAocWithCreds(`${BASE_URL}/${y}`);
}
export function fecthAocWithCreds(url: string) {
  if (!process.env.token) {
    console.error("Token not found in .env");
    process.exit(1);
  }
  if (!process.env.email) {
    console.error("Email not found in .env");
    process.exit(1);
  }
  return fetch(url, {
    credentials: "include",
    headers: {
      "User-Agent": `github.com/lou-bi/advent-of-code by ${process.env.email}`,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Cookie: `session=${process.env.token}`,
    },
  });
}
export function fecthAoc(url: string) {
  return fetch(url);
}

async function fetchInput(y: string, d: string) {
  return await fetch(`https://adventofcode.com/${y}/day/${d}/input`, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Cookie: `session=${Deno.env.get("token")}`,

      "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      Priority: "u=0, i",
    },
    referrer: "https://adventofcode.com/2025/day/9",
    method: "GET",
    mode: "cors",
  });
}

const [year, day] = Deno.args;
if (!year) {
  console.error("Missing arg: year");
  Deno.exit(1);
}
if (!day) {
  console.error("Missing arg: day");
  Deno.exit(1);
}
if (!Deno.env.get("token")) {
  console.error("Missing in .env: token");
  Deno.exit(1);
}
try {
  await Deno.lstat(`${year}/${day}`);
  console.log(`Already exists: ${year}/${day}`);
  Deno.exit(0);
} catch (_) {
  /** */
}

const input = await fetchInput(year, day).then((r) => r.text());
const template = await Deno.readTextFile("./template.ts");
console.log(template);
try {
  await Deno.lstat(year);
  await Deno.mkdir(`${year}/${day}`);
  await Deno.writeTextFile(`${year}/${day}/test.txt`, "");
  await Deno.writeTextFile(`${year}/${day}/in.txt`, input);
  await Deno.writeTextFile(`${year}/${day}/1.ts`, template);
  await Deno.writeTextFile(`${year}/${day}/2.ts`, template);
} catch (_) {
  /** */
}

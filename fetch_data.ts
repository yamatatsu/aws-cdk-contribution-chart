#!/usr/bin/env -S deno run --allow-net=api.github.com --allow-write=./raw_data,./data.json --allow-read=./raw_data
import { format } from "https://deno.land/std@0.77.0/datetime/mod.ts";
import { walkSync } from "https://deno.land/std@0.122.0/fs/mod.ts";

const res = await fetch(
  "https://api.github.com/repos/aws/aws-cdk/contributors?per_page=100",
  { headers: { Accept: "application/vnd.github.v3+json" } },
);
const json = await res.text();

Deno.writeTextFileSync(
  `./raw_data/${format(new Date(), "yyyy-MM-dd")}.json`,
  json,
);

type Contributors = {
  "login": string;
  "id": number;
  "node_id": string;
  "avatar_url": string;
  "gravatar_id": string;
  "url": string;
  "html_url": string;
  "followers_url": string;
  "following_url": string;
  "gists_url": string;
  "starred_url": string;
  "subscriptions_url": string;
  "organizations_url": string;
  "repos_url": string;
  "events_url": string;
  "received_events_url": string;
  "type": string;
  "site_admin": boolean;
  "contributions": number;
}[];
type Output = Record<string, Record<string, number>>;

const output = Array.from(walkSync("./raw_data/")).reduce((acc, entry) => {
  if (entry.isDirectory) {
    return acc;
  }

  console.info(entry.path);

  const contributors: Contributors = JSON.parse(
    Deno.readTextFileSync(entry.path),
  );
  const dailyJson = contributors.reduce<Record<string, number>>(
    (acc, c) => ({ ...acc, [c.login]: c.contributions }),
    {},
  );
  const dateStr = entry.name.split(".")[0];
  return { ...acc, [dateStr]: dailyJson };
}, {} as Output);

Deno.writeTextFileSync("./data.json", JSON.stringify(output, null, 2));

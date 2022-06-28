import { $, chalk } from "zx";

$.verbose = false;

type Rank = Record<string, number>;
type RankTaple = [string, Rank];
type DailyRanks = Record<string, Rank>;

const BASE_DIR = `${__dirname}/..`;
const RAW_DATA_DIR = `${BASE_DIR}/raw_data`;

main().then(
  () => console.info(chalk.green("Success!")),
  (error) => console.error(error)
);

async function main() {
  await fetchAndWriteFile();

  const filenames = filterByTwoWeek(await walk());

  const dailyRank: DailyRanks = await createDailyRankDiffs(filenames);

  const firstKey: string = getFirstKey(filenames);
  const firstData: Rank = await createFirstRank(filenames);

  await writeJson({ ...dailyRank, [firstKey]: firstData });
}

async function fetchAndWriteFile() {
  const date = (await $`date '+%Y-%m-%d'`).stdout.trim();

  await $`curl \
    -H "Accept: application/vnd.github.v3+json" \
    'https://api.github.com/repos/aws/aws-cdk/contributors?per_page=100' \
    | jq 'map({(.login): .contributions}) | add' \
    > ${RAW_DATA_DIR}/${date}.json`;
}

async function walk(): Promise<string[]> {
  return (await $`ls ${RAW_DATA_DIR}`).stdout.trim().split("\n");
}
function filterByTwoWeek(filenames: string[]): string[] {
  return filenames
    .filter((_, i) => i % 7 === 0)
    .concat(filenames[filenames.length - 1]);
}

async function read(filenames: string[]): Promise<RankTaple[]> {
  return Promise.all(
    filenames.map(async (filename) => [
      toYmd(filename),
      await readFile(filename),
    ])
  );
}
async function createDailyRankDiffs(filenames: string[]): Promise<DailyRanks> {
  const dateRankTapples = await read(filenames);
  const diffTapples = dateRankTapples.reduce<RankTaple[]>(
    (acc, rankTapple, index) => {
      if (index === 0) {
        return [rankTapple];
      }
      const [ymd, rank] = rankTapple;
      const [, prevRank] = dateRankTapples[index - 1];
      const diff = pickBy(
        rank,
        (contributorName, val) => prevRank[contributorName] !== val
      );
      const missingRankers = mapValues(
        pickBy(prevRank, (contributorName) => !rank[contributorName]),
        () => 0
      );
      return [...acc, [ymd, { ...diff, ...missingRankers }]];
    },
    []
  );
  return Object.fromEntries(diffTapples);
}

function getFirstKey(filenames: string[]): string {
  return toYmd(filenames[0]);
}

function pickBy<V>(
  record: Record<string, V>,
  fn: (key: string, val: V) => boolean
): Record<string, V> {
  return Object.fromEntries(
    Object.entries<V>(record).filter(([key, val]) => fn(key, val))
  );
}
function mapValues<V1, V2>(
  record: Record<string, V1>,
  fn: (key: string, val: V1) => V2
): Record<string, V2> {
  return Object.fromEntries(
    Object.entries<V1>(record).map(([key, val]) => [key, fn(key, val)])
  );
}

async function createFirstRank(filenames: string[]): Promise<Rank> {
  const dateRankTapples = await read(filenames);
  const [[, firstRank]] = dateRankTapples;

  const contributorNameMap = dateRankTapples
    .map(([, rank]) => rank)
    .flatMap((rank) => Object.keys(rank))
    .reduce<Rank>(
      (acc, contributorName) => ({ ...acc, [contributorName]: 0 }),
      {}
    );
  return { ...contributorNameMap, ...firstRank };
}

function toYmd(filename: string) {
  return filename.split(".")[0];
}
async function readFile(filename: string): Promise<Rank> {
  const { stdout } = await $`cat ${RAW_DATA_DIR}/${filename}`;
  return JSON.parse(stdout);
}

async function writeJson(output: DailyRanks) {
  await $`echo ${JSON.stringify(
    output,
    null,
    2
  )} > ${BASE_DIR}/public/data.json`;
}

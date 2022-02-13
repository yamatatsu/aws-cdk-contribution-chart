import { $, chalk } from "zx";

type Rank = Record<string, number>;
type Output = Record<string, Rank>;

const BASE_DIR = `${__dirname}/..`;
const RAW_DATA_DIR = `${BASE_DIR}/raw_data`;

main().then(
  () => console.info(chalk.green("Success!")),
  (error) => console.error(error)
);

async function main() {
  await fetchAndWriteFile();

  const filenames = await walk();

  const output: Output = await concatFiles(filenames);
  const firstKey: string = getFirstKey(filenames);
  const firstData: Rank = await createFirstRank(filenames);

  await writeJson({ ...output, [firstKey]: firstData });
}

async function fetchAndWriteFile() {
  const date = (await $`date '+%Y-%m-%d'`).stdout.trim();

  await $`curl \
    -H "Accept: application/vnd.github.v3+json" \
    'https://api.github.com/repos/aws/aws-cdk/contributors?per_page=100' \
    | jq 'map({(.login): .contributions}) | add' \
    > ${RAW_DATA_DIR}/${date}.json`;
}

async function walk() {
  return (await $`ls ${RAW_DATA_DIR}`).stdout.trim().split("\n");
}

async function read(filenames: string[]): Promise<[string, Rank][]> {
  return Promise.all(
    filenames.map(async (filename) => [
      toYmd(filename),
      await readFile(filename),
    ])
  );
}
async function concatFiles(filenames: string[]): Promise<Output> {
  return (await read(filenames)).reduce<Output>(
    (acc, [ymd, rank]) => ({ ...acc, [ymd]: rank }),
    {}
  );
}

function getFirstKey(filenames: string[]): string {
  return toYmd(filenames[0]);
}

async function createFirstRank(filenames: string[]): Promise<Rank> {
  const dateRankTapples = await read(filenames);
  const [[, firstRank]] = dateRankTapples;

  const contributerNameMap = dateRankTapples
    .map(([, rank]) => rank)
    .flatMap((rank) => Object.keys(rank))
    .reduce<Rank>(
      (acc, contributerName) => ({ ...acc, [contributerName]: 0 }),
      {}
    );
  return { ...contributerNameMap, ...firstRank };
}

function toYmd(filename: string) {
  return filename.split(".")[0];
}
async function readFile(filename: string): Promise<Rank> {
  const { stdout } = await $`cat ${RAW_DATA_DIR}/${filename}`;
  return JSON.parse(stdout);
}

async function writeJson(output: Output) {
  await $`echo ${JSON.stringify(
    output,
    null,
    2
  )} > ${BASE_DIR}/public/data.json`;
}

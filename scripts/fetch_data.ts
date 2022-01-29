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

  const files = await walk();

  const output: Output = await concatFiles(files);
  const firstKey: string = toYmd(files[0]);
  const firstData: Rank = await mergeFiles(files);

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

const walk = async () =>
  (await $`ls ${RAW_DATA_DIR}`).stdout.trim().split("\n");

const concatFiles = (files: string[]) =>
  files.reduce(
    async (accPromise, filename) => ({
      ...(await accPromise),
      [toYmd(filename)]: await readFile(filename),
    }),
    Promise.resolve({} as Output)
  );

const mergeFiles = (files: string[]): Promise<Rank> =>
  files.reduce<Promise<Rank>>(
    async (accPromise, filename) =>
      merge(await accPromise, await readFile(filename)),
    Promise.resolve({})
  );

const toYmd = (filename: string) => filename.split(".")[0];
const readFile = (filename: string): Promise<Rank> =>
  $`cat ${RAW_DATA_DIR}/${filename}`.then((res) => JSON.parse(res.stdout));
const merge = (o1: Rank, o2: Rank): Rank =>
  Object.entries(o2).reduce(
    (acc, [name, val]) => (acc[name] ? acc : { ...acc, [name]: val }),
    o1
  );

async function writeJson(output: Output) {
  await $`echo ${JSON.stringify(
    output,
    null,
    2
  )} > ${BASE_DIR}/public/data.json`;
}

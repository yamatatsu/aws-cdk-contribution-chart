import { $, chalk } from "zx";

type Output = Record<string, any>;

const BASE_DIR = `${__dirname}/..`;
const RAW_DATA_DIR = `${BASE_DIR}/raw_data`;

main().then(
  () => console.info(chalk.green("Success!")),
  (error) => console.error(error)
);

async function main() {
  await fetchAndWriteFile();

  const files = await walk();

  const output = await concatFiles(files);

  await writeJson(output);
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

async function concatFiles(files: string[]) {
  return await files.reduce(async (accPromise, filename) => {
    const acc = await accPromise;
    const [date] = filename.split(".");
    const json = (await $`cat ${RAW_DATA_DIR}/${filename}`).stdout;
    return { ...acc, [date]: JSON.parse(json) };
  }, Promise.resolve({} as Output));
}

async function writeJson(output: Output) {
  await $`echo ${JSON.stringify(
    output,
    null,
    2
  )} > ${BASE_DIR}/public/data.json`;
}

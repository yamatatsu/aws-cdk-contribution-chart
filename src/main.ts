import "./style.css";
import allData from "./mock-data";
import Chart from "./chart";

const stepDuration = 2000;

function* generateIterator(_data: Record<string, Record<string, number>>) {
  for (const [yearStr, rank] of Object.entries(_data)) {
    yield [yearStr, rank] as const;
  }
}

const chart = new Chart("chartdiv", stepDuration);

const iterator = generateIterator(allData);

// update data with values each 1.5 sec
const interval = setInterval(function () {
  const result = iterator.next();

  if (result.done) {
    clearInterval(interval);
    clearInterval(sortInterval);
    return;
  }

  const [year, rank] = result.value;

  chart.updateData(year, rank);
}, stepDuration);

const sortInterval = setInterval(function () {
  chart.sortCategoryAxis();
}, 100);

const result = iterator.next();
if (result.done) {
  throw new Error("The data has no record.");
}
const [, rank] = result.value;
chart.setInitialData(rank);

setTimeout(function () {
  const result = iterator.next();
  if (result.done) {
    throw new Error("The data has only one record.");
  }
  const [year, rank] = result.value;
  chart.updateData(year, rank);
}, 50);

chart.appear();

import "./style.css";
// import allData from "./mock-data";
import Chart from "./chart";

const stepDuration = 1000;

const fetchResult = await fetch("./data.json");
const allData = await fetchResult.json();

function* generateIterator(_data: Record<string, Record<string, number>>) {
  for (const [ymd, rank] of Object.entries(_data)) {
    yield [ymd, rank] as const;
  }
}

const chart = new Chart("chartdiv", stepDuration);

const iterator = generateIterator(allData);

// update data with values each 1.5 sec
const interval = setInterval(function () {
  const iteratorResult = iterator.next();

  if (iteratorResult.done) {
    clearInterval(interval);
    clearInterval(sortInterval);
    return;
  }

  const [ymd, rank] = iteratorResult.value;

  chart.updateDate(ymd);
  chart.update(rank);
}, stepDuration);

const sortInterval = setInterval(function () {
  chart.sortCategoryAxis();
}, 100);

const iteratorResult = iterator.next();
if (iteratorResult.done) {
  throw new Error("The data has no record.");
}
const [, rank] = iteratorResult.value;
chart.setInitialData(rank);

setTimeout(function () {
  const result = iterator.next();
  if (result.done) {
    throw new Error("The data has only one record.");
  }
  const [ymd, rank] = result.value;
  chart.updateDate(ymd);
  chart.update(rank);
}, 50);

chart.appear();

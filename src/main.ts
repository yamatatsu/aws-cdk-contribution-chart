import "./style.css";
// import allData from "./mock-data";
import Chart from "./chart";
import MyWorker from "./worker?worker";
import { updateDuration } from "./consts";

const worker = new MyWorker();

const fetchResult = await fetch("./data.json");
const allData = await fetchResult.json();

const chart = new Chart("chartdiv", updateDuration);

const iterator = generateIterator(allData);

const iteratorResult = iterator.next();
if (iteratorResult.done) {
  throw new Error("The data has no record.");
}
const [, rank] = iteratorResult.value;
chart.setInitialData(rank);
chart.appear();

worker.onmessage = (event: MessageEvent) => {
  switch (event.data.type) {
    case "eventForFirstUpdate": {
      const result = iterator.next();
      if (result.done) {
        throw new Error("The data has only one record.");
      }
      const [ymd, rank] = result.value;
      chart.updateDate(ymd);
      chart.update(rank);
    }
    case "intervalForUpdate": {
      update();
      break;
    }
    case "intervalForSort": {
      chart.sortCategoryAxis();
      break;
    }
    default:
      break;
  }
};

function update() {
  const iteratorResult = iterator.next();

  if (iteratorResult.done) {
    worker.postMessage("done");
    return;
  }

  const [ymd, rank] = iteratorResult.value;

  chart.updateDate(ymd);
  chart.update(rank);
}

function* generateIterator(_data: Record<string, Record<string, number>>) {
  for (const [ymd, rank] of Object.entries(_data)) {
    yield [ymd, rank] as const;
  }
}

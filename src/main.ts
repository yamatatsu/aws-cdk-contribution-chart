import "./style.css";
import allData from "./mock-data";
import Chart from "./chart";

console.log("data", allData);

const stepDuration = 2000;

const chart = new Chart("chartdiv", stepDuration);

let year = 2002;

// update data with values each 1.5 sec
const interval = setInterval(function () {
  year++;

  if (year > 2018) {
    clearInterval(interval);
    clearInterval(sortInterval);
  }

  chart.updateData(year, allData[year]);
}, stepDuration);

const sortInterval = setInterval(function () {
  chart.sortCategoryAxis();
}, 100);

chart.setInitialData(allData[year]);
setTimeout(function () {
  year++;
  chart.updateData(year, allData[year]);
}, 50);

chart.appear();

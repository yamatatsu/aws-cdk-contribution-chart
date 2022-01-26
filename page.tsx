/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
        <style>
          {`
#chartdiv {
  width: 100%;
  height: 500px;
}
          `}
        </style>
        <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
        <script>
          {`
// import am4themes_https://cdn.amcharts.com/lib/5/Animated from "@amcharts/amcharts4/themes/https://cdn.amcharts.com/lib/5/Animated";

/* Chart code */
// Data
let allData = {
  "2002": {
    "Friendster": 0,
    "Facebook": 0,
    "Flickr": 0,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 0,
    "Instagram": 0,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 0
  },
  "2003": {
    "Friendster": 4470000,
    "Facebook": 0,
    "Flickr": 0,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 0,
    "Instagram": 0,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 0
  },
  "2004": {
    "Friendster": 5970054,
    "Facebook": 0,
    "Flickr": 3675135,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 0,
    "Instagram": 0,
    "MySpace": 980036,
    "Orkut": 4900180,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 0
  },
  "2005": {
    "Friendster": 7459742,
    "Facebook": 0,
    "Flickr": 7399354,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 9731610,
    "Instagram": 0,
    "MySpace": 19490059,
    "Orkut": 9865805,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 1946322
  },
  "2006": {
    "Friendster": 8989854,
    "Facebook": 0,
    "Flickr": 14949270,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 19932360,
    "Instagram": 0,
    "MySpace": 54763260,
    "Orkut": 14966180,
    "Pinterest": 0,
    "Reddit": 248309,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 19878248
  },
  "2007": {
    "Friendster": 24253200,
    "Facebook": 0,
    "Flickr": 29299875,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 29533250,
    "Instagram": 0,
    "MySpace": 69299875,
    "Orkut": 26916562,
    "Pinterest": 0,
    "Reddit": 488331,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 143932250
  },
  "2008": {
    "Friendster": 51008911,
    "Facebook": 100000000,
    "Flickr": 30000000,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 55045618,
    "Instagram": 0,
    "MySpace": 72408233,
    "Orkut": 44357628,
    "Pinterest": 0,
    "Reddit": 1944940,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 294493950
  },
  "2009": {
    "Friendster": 28804331,
    "Facebook": 276000000,
    "Flickr": 41834525,
    "Google Buzz": 0,
    "Google+": 0,
    "Hi5": 57893524,
    "Instagram": 0,
    "MySpace": 70133095,
    "Orkut": 47366905,
    "Pinterest": 0,
    "Reddit": 3893524,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 0,
    "WeChat": 0,
    "Weibo": 0,
    "Whatsapp": 0,
    "YouTube": 413611440
  },
  "2010": {
    "Friendster": 0,
    "Facebook": 517750000,
    "Flickr": 54708063,
    "Google Buzz": 166029650,
    "Google+": 0,
    "Hi5": 59953290,
    "Instagram": 0,
    "MySpace": 68046710,
    "Orkut": 49941613,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 43250000,
    "WeChat": 0,
    "Weibo": 19532900,
    "Whatsapp": 0,
    "YouTube": 480551990
  },
  "2011": {
    "Friendster": 0,
    "Facebook": 766000000,
    "Flickr": 66954600,
    "Google Buzz": 170000000,
    "Google+": 0,
    "Hi5": 46610848,
    "Instagram": 0,
    "MySpace": 46003536,
    "Orkut": 47609080,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 0,
    "Twitter": 92750000,
    "WeChat": 47818400,
    "Weibo": 48691040,
    "Whatsapp": 0,
    "YouTube": 642669824
  },
  "2012": {
    "Friendster": 0,
    "Facebook": 979750000,
    "Flickr": 79664888,
    "Google Buzz": 170000000,
    "Google+": 107319100,
    "Hi5": 0,
    "Instagram": 0,
    "MySpace": 0,
    "Orkut": 45067022,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 146890156,
    "Twitter": 160250000,
    "WeChat": 118123370,
    "Weibo": 79195730,
    "Whatsapp": 0,
    "YouTube": 844638200
  },
  "2013": {
    "Friendster": 0,
    "Facebook": 1170500000,
    "Flickr": 80000000,
    "Google Buzz": 170000000,
    "Google+": 205654700,
    "Hi5": 0,
    "Instagram": 117500000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 0,
    "Reddit": 0,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 293482050,
    "Twitter": 223675000,
    "WeChat": 196523760,
    "Weibo": 118261880,
    "Whatsapp": 300000000,
    "YouTube": 1065223075
  },
  "2014": {
    "Friendster": 0,
    "Facebook": 1334000000,
    "Flickr": 0,
    "Google Buzz": 170000000,
    "Google+": 254859015,
    "Hi5": 0,
    "Instagram": 250000000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 0,
    "Reddit": 135786956,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 388721163,
    "Twitter": 223675000,
    "WeChat": 444232415,
    "Weibo": 154890345,
    "Whatsapp": 498750000,
    "YouTube": 1249451725
  },
  "2015": {
    "Friendster": 0,
    "Facebook": 1516750000,
    "Flickr": 0,
    "Google Buzz": 170000000,
    "Google+": 298950015,
    "Hi5": 0,
    "Instagram": 400000000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 0,
    "Reddit": 163346676,
    "Snapchat": 0,
    "TikTok": 0,
    "Tumblr": 475923363,
    "Twitter": 304500000,
    "WeChat": 660843407,
    "Weibo": 208716685,
    "Whatsapp": 800000000,
    "YouTube": 1328133360
  },
  "2016": {
    "Friendster": 0,
    "Facebook": 1753500000,
    "Flickr": 0,
    "Google Buzz": 0,
    "Google+": 398648000,
    "Hi5": 0,
    "Instagram": 550000000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 143250000,
    "Reddit": 238972480,
    "Snapchat": 238648000,
    "TikTok": 0,
    "Tumblr": 565796720,
    "Twitter": 314500000,
    "WeChat": 847512320,
    "Weibo": 281026560,
    "Whatsapp": 1000000000,
    "YouTube": 1399053600
  },
  "2017": {
    "Friendster": 0,
    "Facebook": 2035750000,
    "Flickr": 0,
    "Google Buzz": 0,
    "Google+": 495657000,
    "Hi5": 0,
    "Instagram": 750000000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 195000000,
    "Reddit": 297394200,
    "Snapchat": 0,
    "TikTok": 239142500,
    "Tumblr": 593783960,
    "Twitter": 328250000,
    "WeChat": 921742750,
    "Weibo": 357569030,
    "Whatsapp": 1333333333,
    "YouTube": 1495657000
  },
  "2018": {
    "Friendster": 0,
    "Facebook": 2255250000,
    "Flickr": 0,
    "Google Buzz": 0,
    "Google+": 430000000,
    "Hi5": 0,
    "Instagram": 1000000000,
    "MySpace": 0,
    "Orkut": 0,
    "Pinterest": 246500000,
    "Reddit": 355000000,
    "Snapchat": 0,
    "TikTok": 500000000,
    "Tumblr": 624000000,
    "Twitter": 329500000,
    "WeChat": 1000000000,
    "Weibo": 431000000,
    "Whatsapp": 1433333333,
    "YouTube": 1900000000
  }
};

window.onload = () => {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  let root = am5.Root.new("chartdiv");

  root.numberFormatter.setAll({
    numberFormat: "#a",

    // Group only into M (millions), and B (billions)
    bigNumberPrefixes: [
      { number: 1e6, suffix: "M" },
      { number: 1e9, suffix: "B" }
    ],

    // Do not use small number prefixes at all
    smallNumberPrefixes: []
  });

  let stepDuration = 2000;


  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([am5themes_Animated.new(root)]);


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  let chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "none",
    wheelY: "none"
  }));


  // We don't want zoom-out button to appear while animating, so we hide it at all
  chart.zoomOutButton.set("forceHidden", true);


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  let yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 20,
    inversed: true
  });
  // hide grid
  yRenderer.grid.template.set("visible", false);

  let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "network",
    renderer: yRenderer
  }));

  let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    strictMinMax: true,
    extraMax: 0.1,
    renderer: am5xy.AxisRendererX.new(root, {})
  }));

  xAxis.set("interpolationDuration", stepDuration / 10);
  xAxis.set("interpolationEasing", am5.ease.linear);


  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    categoryYField: "network"
  }));

  // Rounded corners for columns
  series.columns.template.setAll({ cornerRadiusBR: 5, cornerRadiusTR: 5 });

  // Make each column to be of a different color
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  // Add label bullet
  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      sprite: am5.Label.new(root, {
        text: "{valueXWorking.formatNumber('#.# a')}",
        fill: root.interfaceColors.get("alternativeText"),
        centerX: am5.p100,
        centerY: am5.p50,
        populateText: true
      })
    });
  });

  let label = chart.plotContainer.children.push(am5.Label.new(root, {
    text: "2002",
    fontSize: "8em",
    opacity: 0.2,
    x: am5.p100,
    y: am5.p100,
    centerY: am5.p100,
    centerX: am5.p100
  }));

  // Get series item by category
  function getSeriesItem(category) {
    for (var i = 0; i < series.dataItems.length; i++) {
      let dataItem = series.dataItems[i];
      if (dataItem.get("categoryY") == category) {
        return dataItem;
      }
    }
  }

  // Axis sorting
  function sortCategoryAxis() {
    // sort by value
    series.dataItems.sort(function (x, y) {
      return y.get("valueX") - x.get("valueX"); // descending
      //return x.get("valueX") - y.get("valueX"); // ascending
    });

    // go through each axis item
    am5.array.each(yAxis.dataItems, function (dataItem) {
      // get corresponding series item
      let seriesDataItem = getSeriesItem(dataItem.get("category"));

      if (seriesDataItem) {
        // get index of series data item
        let index = series.dataItems.indexOf(seriesDataItem);
        // calculate delta position
        let deltaPosition =
          (index - dataItem.get("index", 0)) / series.dataItems.length;
        // set index to be the same as series data item index
        if (dataItem.get("index") != index) {
          dataItem.set("index", index);
          // set deltaPosition instanlty
          dataItem.set("deltaPosition", -deltaPosition);
          // animate delta position to 0
          dataItem.animate({
            key: "deltaPosition",
            to: 0,
            duration: stepDuration / 2,
            easing: am5.ease.out(am5.ease.cubic)
          });
        }
      }
    });
    // sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
    yAxis.dataItems.sort(function (x, y) {
      return x.get("index") - y.get("index");
    });
  }

  let year = 2002;

  // update data with values each 1.5 sec
  let interval = setInterval(function () {
    year++;

    if (year > 2018) {
      clearInterval(interval);
      clearInterval(sortInterval);
    }

    updateData();
  }, stepDuration);

  let sortInterval = setInterval(function () {
    sortCategoryAxis();
  }, 100);

  function setInitialData() {
    let d = allData[year];

    for (var n in d) {
      series.data.push({ network: n, value: d[n] });
      yAxis.data.push({ network: n });
    }
  }

  function updateData() {
    let itemsWithNonZero = 0;

    if (allData[year]) {
      label.set("text", year.toString());

      am5.array.each(series.dataItems, function (dataItem) {
        let category = dataItem.get("categoryY");
        let value = allData[year][category];

        if (value > 0) {
          itemsWithNonZero++;
        }

        dataItem.animate({
          key: "valueX",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
        dataItem.animate({
          key: "valueXWorking",
          to: value,
          duration: stepDuration,
          easing: am5.ease.linear
        });
      });

      yAxis.zoom(0, itemsWithNonZero / yAxis.dataItems.length);
    }
  }

  setInitialData();
  setTimeout(function () {
    year++;
    updateData();
  }, 50);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);
}
          `}
        </script>
      </head>
      <body>
        <h1>Hello world</h1>
        <div id="chartdiv"></div>
      </body>
    </html>
  );
}

function handler() {
  const html = renderSSR(<App />);
  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);

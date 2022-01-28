import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

export default class Chart {
  private readonly chart: am5xy.XYChart;
  private readonly series: am5xy.ColumnSeries;
  private readonly yAxis: am5xy.CategoryAxis<am5xy.AxisRendererY>;
  private readonly label: am5.Label;

  constructor(rootId: string, private readonly stepDuration: number) {
    const root = am5.Root.new(rootId);

    root.numberFormatter.setAll({
      numberFormat: "#a",

      // Group only into M (millions), and B (billions)
      bigNumberPrefixes: [
        { number: 1e6, suffix: "M" },
        { number: 1e9, suffix: "B" },
      ],

      // Do not use small number prefixes at all
      smallNumberPrefixes: [],
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5.Theme.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "none",
        wheelY: "none",
      })
    );

    // We don't want zoom-out button to appear while animating, so we hide it at all
    chart.zoomOutButton.set("forceHidden", true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 20,
      inversed: true,
    });
    // hide grid
    yRenderer.grid.template.set("visible", false);

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new<
        typeof am5xy.CategoryAxis,
        am5xy.CategoryAxis<am5xy.AxisRendererY>
      >(root, {
        maxDeviation: 0,
        categoryField: "network",
        renderer: yRenderer,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        strictMinMax: true,
        extraMax: 0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    xAxis.set("interpolationDuration", stepDuration / 10);
    xAxis.set("interpolationEasing", am5.ease.linear);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        categoryYField: "network",
      })
    );

    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadiusBR: 5,
      cornerRadiusTR: 5,
    });

    // Make each column to be of a different color
    series.columns.template.adapters.add("fill", (fill, target) => {
      // @ts-expect-error
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      // @ts-expect-error
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    // Add label bullet
    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: "{valueXWorking.formatNumber('#.# a')}",
          fill: root.interfaceColors.get("alternativeText"),
          centerX: am5.p100,
          centerY: am5.p50,
          populateText: true,
        }),
      });
    });

    const label = chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "2002",
        fontSize: "8em",
        opacity: 0.2,
        x: am5.p100,
        y: am5.p100,
        centerY: am5.p100,
        centerX: am5.p100,
      })
    );

    this.chart = chart;
    this.yAxis = yAxis;
    this.series = series;
    this.label = label;
  }

  public sortCategoryAxis() {
    // sort by value
    this.series.dataItems.sort((x, y) => {
      return (y.get("valueX") ?? 0) - (x.get("valueX") ?? 0);
    });

    // go through each axis item
    am5.array.each(this.yAxis.dataItems, (dataItem) => {
      // get corresponding series item
      const seriesDataItem = this.series.dataItems.find(
        (item) => item.get("categoryY") === dataItem.get("category")
      );
      if (!seriesDataItem) return;

      // get index of series data item
      const index = this.series.dataItems.indexOf(seriesDataItem);
      if (dataItem.get("index") === index) return;

      // calculate delta position
      const deltaPosition =
        (index - dataItem.get("index", 0)) / this.series.dataItems.length;

      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instanlty
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: this.stepDuration / 2,
        easing: am5.ease.out(am5.ease.cubic),
      });
    });
    // sort axis items by index.
    // This changes the order instantly, but as deltaPosition is set, they keep in the same places and then animate to true positions.
    this.yAxis.dataItems.sort((x, y) => {
      return (x.get("index") ?? 0) - (y.get("index") ?? 0);
    });
  }

  public setInitialData(data: Record<string, number>) {
    Object.entries(data).forEach(([name, value]) => {
      this.series.data.push({ network: name, value });
      this.yAxis.data.push({ network: name });
    });
  }

  public updateData(year: string, data: Record<string, number>) {
    let itemsWithNonZero = 0;

    this.label.set("text", year);

    am5.array.each(this.series.dataItems, (dataItem) => {
      const category = dataItem.get("categoryY") ?? "";
      const value = data[category];

      if (value > 0) {
        itemsWithNonZero++;
      }

      dataItem.animate({
        key: "valueX",
        to: value,
        duration: this.stepDuration,
        easing: am5.ease.linear,
      });
      dataItem.animate({
        key: "valueXWorking",
        to: value,
        duration: this.stepDuration,
        easing: am5.ease.linear,
      });
    });

    this.yAxis.zoom(0, itemsWithNonZero / this.yAxis.dataItems.length);
  }

  public appear() {
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    this.series.appear(1000);
    this.chart.appear(1000, 100);
  }
}

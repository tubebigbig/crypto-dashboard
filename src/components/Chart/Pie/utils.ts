import Chart from "chart.js/auto";

export interface PieChartConfig {
  labels: string[];
  labelsColor: string;
  toolTipLabel: string;
  backgroundColor?: string[];
  legendPosition?: "top" | "bottom" | "left" | "right";
}

export default class PieChart {
  private chart: Chart<"pie"> | null = null;

  constructor(
    private canvasElem: HTMLCanvasElement,
    private config: PieChartConfig
  ) {
    this.initChart();
  }

  private initChart() {
    this.chart = new Chart(this.canvasElem, {
      type: "pie",
      options: {
        plugins: {
          legend: {
            labels: {
              color: this.config.labelsColor,
            },
            display: true,
            position: this.config.legendPosition || "bottom",
            align: "center",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      data: {
        labels: this.config.labels,
        datasets: [
          {
            label: this.config.toolTipLabel,
            data: [],
            backgroundColor:
              this.config.backgroundColor ??
              this.config.labels.map(
                () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
              ),
          },
        ],
      },
    });
  }

  private updateChart() {
    if (!this.chart) this.initChart();
    this.chart?.update();
  }

  public updateChartData(data: number[]) {
    if (!this.chart) return;
    this.chart.data.datasets[0].data = data;
    this.updateChart();
  }

  public updateConfig(config: PieChartConfig) {
    if (
      !this.chart ||
      !this.chart.options.plugins ||
      !this.chart.options.plugins.legend ||
      !this.chart.options.plugins.legend.labels
    )
      return;
    this.chart.data.labels = config.labels;
    this.chart.options.plugins.legend.labels.color = config.labelsColor;
    this.chart.data.datasets[0].label = config.toolTipLabel;
    this.chart.data.datasets[0].backgroundColor =
      config.backgroundColor ||
      config.labels.map(
        () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
      );
    this.chart.options.plugins.legend.position =
      config.legendPosition || "bottom";
    this.updateChart();
  }

  public destroyChart() {
    this.chart?.canvas?.getContext("2d")?.clearRect(0, 0, 0, 0);
    this.chart?.destroy();
  }
}

import { useRef, useEffect } from "react";
import useCallbackRef from "@utils/useCallbackRef";

import PieChart, { PieChartConfig } from "./utils";

export type PieProps = {
  data: number[];
} & PieChartConfig;

const Pie = ({ data, ...config }: PieProps) => {
  const chartRef = useRef<PieChart | null>(null);
  const [canvasRef, setCanvasRef] = useCallbackRef<HTMLCanvasElement>(
    (canvasElem) => {
      if (chartRef.current) chartRef.current.destroyChart();
      if (canvasElem) {
        chartRef.current = new PieChart(canvasElem, config);
        chartRef.current.updateChartData(data);
      }
    }
  );

  useEffect(() => {
    () => {
      if (chartRef.current) chartRef.current.destroyChart();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!chartRef.current)
      chartRef.current = new PieChart(canvasRef.current, config);
    chartRef.current.updateChartData(data);
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.updateConfig(config);
  }, [config]);

  return <canvas ref={setCanvasRef} />;
};

export default Pie;

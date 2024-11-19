import {
  Chart as ChartJS,
  ChartTypeRegistry,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  registerables,
  ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { useEffect, useRef } from "react";
import { AdvancedChartConfig, SupportedChartType } from "types";

// Register all Chart.js components
ChartJS.register(...registerables);

interface CustomChartProps<T extends SupportedChartType> {
  config: AdvancedChartConfig<T>;
  onConfigChange: (config: Partial<AdvancedChartConfig<T>>) => void;
  width?: number | string;
  height?: number | string;
}

const CustomChart = <T extends SupportedChartType>({
  config,
  onConfigChange,
  width = "100%",
  height = 400,
}: CustomChartProps<T>) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Destroy existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        chartInstanceRef.current = new ChartJS(ctx, {
          type: config.type,
          data: config.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...(config.options as _DeepPartialObject<
              CoreChartOptions<keyof ChartTypeRegistry> &
                ElementChartOptions<keyof ChartTypeRegistry> &
                PluginChartOptions<keyof ChartTypeRegistry> &
                DatasetChartOptions<keyof ChartTypeRegistry> &
                ScaleChartOptions<keyof ChartTypeRegistry>
            >),
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default CustomChart;

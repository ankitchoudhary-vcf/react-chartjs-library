import { ChartData, ChartOptions, Color } from "chart.js";

export type SupportedChartType =
  | "line"
  | "bar"
  | "pie"
  | "doughnut"
  | "radar"
  | "polarArea";

export interface Datasetstyling {
  borderWidth?: number;
  borderDash?: number[];
  pointStyle?:
    | "circle"
    | "cross"
    | "crossRot"
    | "dash"
    | "line"
    | "rect"
    | "rectRounded"
    | "rectRot"
    | "star"
    | "triangle";
  pointBorderWidth?: number;
  fill?: boolean | string;
  tension?: number;
}

export interface AdvancedChartConfig<
  T extends SupportedChartType = SupportedChartType
> {
  type: T;
  data: ChartData<T> & {
    datasets: Array<ChartData<T>["datasets"][number] & Datasetstyling>;
  };
  options?: ChartOptions<T> & {
    barThickness?: number;
    cutout?: number | string;
    animation?: {
      duration?: number;
      easing?: "linear" | "easeInQuad" | "easeOutQuad" | "easeInOutQuad";
    };
    plugins?: {
      title?: {
        display?: boolean;
        text?: string;
        fontSize?: number;
        color?: Color;
      };
      legend?: {
        position?: "top" | "bottom" | "left" | "right";
        labels?: {
          color?: Color;
          font?: {
            size?: number;
            family?: string;
          };
        };
      };
    };
    scales?: {
      x?: {
        grid?: {
          display?: boolean;
          color?: Color;
        };
        title?: {
          display?: boolean;
          text?: string;
          color?: Color;
        };
      };
      y?: {
        grid?: {
          display?: boolean;
          color?: Color;
        };
        title?: {
          display?: boolean;
          text?: string;
          color?: Color;
        };
      };
    };
  };
}

export interface AdvancedChartProps<T extends SupportedChartType = "line"> {
  config: AdvancedChartConfig<T>;
  onConfigChange?: (config: Partial<AdvancedChartConfig<T>>) => void;
  width?: number | string;
  height?: number | string;
}

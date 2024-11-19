import { AdvancedChartConfig, SupportedChartType } from "../types";

export const defaultChartConfigurations: Record<
  SupportedChartType,
  Partial<AdvancedChartConfig>
> = {
  line: {
    type: "line",
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "X-Axis",
          },
        },
        y: {
          title: {
            display: true,
            text: "Y-Axis",
          },
        },
      },
    },
  },
  bar: {
    type: "bar",
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Categories",
          },
        },
        y: {
          title: {
            display: true,
            text: "Values",
          },
        },
      },
    },
  },
  pie: {
    type: "pie",
    options: {
      responsive: true,
    },
  },
  doughnut: {
    type: "doughnut",
    options: {
      responsive: true,
    },
  },
  radar: {
    type: "radar",
    options: {
      responsive: true,
      scales: {
        r: {
          title: {
            display: true,
            text: "Values",
          },
        },
      },
    },
  },
  polarArea: {
    type: "polarArea",
    options: {
      responsive: true,
    },
  },
};

// export function mergeChartConfigurations<T extends SupportedChartTypes>(
//   baseConfig: Partial<ChartConfiguration<T>>,
//   customConfig?: Partial<ChartConfiguration<T>>
// ): ChartConfiguration<T> {
//   return deepMerge(
//     defaultChartConfigurations[baseConfig.type as T],
//     baseConfig,
//     customConfig || {}
//   );
// }

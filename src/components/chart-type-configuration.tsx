import { AdvancedChartConfig, SupportedChartType } from "../types";

// Mapping of chart types to their specific configuration requirements
const CHART_TYPE_CONFIGS = {
  line: {
    requiredDatasets: { min: 1, max: 5 },
    supportedFeatures: ["tension", "fill", "pointStyle"],
    defaultOptions: {
      tension: 0.1,
      fill: false,
    },
  },
  bar: {
    requiredDatasets: { min: 1, max: 10 },
    supportedFeatures: ["barThickness", "grouped"],
    defaultOptions: {
      barThickness: "flex",
    },
  },
  pie: {
    requiredDatasets: { min: 1, max: 1 },
    supportedFeatures: ["cutout"],
    defaultOptions: {
      cutout: "0%",
    },
  },
  doughnut: {
    requiredDatasets: { min: 1, max: 1 },
    supportedFeatures: ["cutout"],
    defaultOptions: {
      cutout: "50%",
    },
  },
  radar: {
    requiredDatasets: { min: 1, max: 5 },
    supportedFeatures: ["fill", "pointStyle"],
    defaultOptions: {
      fill: false,
    },
  },
  polarArea: {
    requiredDatasets: { min: 1, max: 1 },
    supportedFeatures: [],
    defaultOptions: {},
  },
};

interface ChartTypeConfigurationProps<T extends SupportedChartType> {
  config: AdvancedChartConfig<T>;
  onConfigChange: (config: Partial<AdvancedChartConfig<T>>) => void;
}

const ChartTypeConfiguration = <T extends SupportedChartType>({
  config,
  onConfigChange,
}: ChartTypeConfigurationProps<T>) => {
  const typeConfig =
    CHART_TYPE_CONFIGS[config.type as keyof typeof CHART_TYPE_CONFIGS];

  const renderTypeSpecificControls = () => {
    switch (config.type) {
      case "line":
        return (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Line Tension</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.data.datasets[0].tension || 0.1}
                onChange={(e) => {
                  const updatedDatasets = config.data.datasets.map(
                    (dataset: any) => ({
                      ...dataset,
                      tension: Number(e.target.value),
                    })
                  );
                  onConfigChange({
                    data: {
                      ...config.data,
                      datasets: updatedDatasets,
                    },
                  });
                }}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={Boolean(config.data.datasets[0].fill)}
                  onChange={(e) => {
                    const updatedDatasets = config.data.datasets.map(
                      (dataset: any) => ({
                        ...dataset,
                        fill: e.target.checked,
                      })
                    );
                    onConfigChange({
                      data: {
                        ...config.data,
                        datasets: updatedDatasets,
                      },
                    });
                  }}
                  className="mr-2"
                />
                Fill Area Under Line
              </label>
            </div>
          </div>
        );
      case "bar":
        return (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Bar Thickness</label>
              <select
                value={config.options?.barThickness || "flex"}
                onChange={(e) => {
                  onConfigChange({
                    options: {
                      ...config.options,
                      barThickness: e.target.value,
                    } as any,
                  });
                }}
                className="w-full p-2 border rounded"
              >
                <option value="flex">Flexible</option>
                <option value="1">Thin</option>
                <option value="10">Thick</option>
              </select>
            </div>
          </div>
        );
      case "pie":
      case "doughnut":
        return (
          <div className="mb-4">
            <label className="block mb-2">Cutout Percentage</label>
            <input
              type="range"
              min="0"
              max="90"
              value={parseInt((config.options?.cutout as string) || "0")}
              onChange={(e) => {
                onConfigChange({
                  options: {
                    ...config.options,
                    cutout: `${e.target.value}%`,
                  } as any,
                });
              }}
              className="w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-bold mb-4">
        {config.type.charAt(0).toUpperCase() + config.type.slice(1)} Chart
        Configuration
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Datasets: {typeConfig.requiredDatasets.min} -{" "}
          {typeConfig.requiredDatasets.max} recommended
        </p>
      </div>

      {renderTypeSpecificControls()}
    </div>
  );
};

export default ChartTypeConfiguration;

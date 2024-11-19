import AdvancedConfigurationPanel from "components/chart-configuration-panel";
import ChartTypeConfiguration from "components/chart-type-configuration";
import CustomChart from "components/custom-chart";
import DataSourceSelector from "components/data-source-selector";
import { DataManagementProvider } from "hoc";
import { useState } from "react";
import { AdvancedChartConfig, SupportedChartType } from "./types";

function App() {
  const [chartConfig, setChartConfig] = useState<
    AdvancedChartConfig<SupportedChartType>
  >({
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Sales Volume",
          data: [12, 19, 3, 5, 2],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
        {
          label: "Revenue",
          data: [5, 10, 15, 8, 12],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.1,
        },
      ],
    },
  });

  const handleConfigChange = (
    newConfig: Partial<AdvancedChartConfig<SupportedChartType>>
  ) => {
    setChartConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  return (
    <DataManagementProvider>
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <CustomChart
            config={chartConfig}
            onConfigChange={handleConfigChange}
            height={400}
          />
        </div>
        <div className="col-span-1 space-y-4">
          <DataSourceSelector
            config={chartConfig}
            onConfigChange={handleConfigChange}
          />
          <ChartTypeConfiguration
            config={chartConfig}
            onConfigChange={handleConfigChange}
          />
          <AdvancedConfigurationPanel
            config={chartConfig}
            onConfigChange={handleConfigChange}
          />
        </div>
      </div>
    </DataManagementProvider>
  );
}

export default App;

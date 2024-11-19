import React, { useState } from "react";
import { AdvancedChartConfig, SupportedChartType } from "../types";
import { useDataManagement } from "hoc";

interface DataSourceSelectorProps<T extends SupportedChartType> {
  config: AdvancedChartConfig<T>;
  onConfigChange: (config: Partial<AdvancedChartConfig<T>>) => void;
}

const DataSourceSelector = <T extends SupportedChartType>({
  config,
  onConfigChange,
}: DataSourceSelectorProps<T>) => {
  const { dataSources } = useDataManagement();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedXColumn, setSelectedXColumn] = useState<string | null>(null);
  const [selectedYColumns, setSelectedYColumns] = useState<string[]>([]);

  const handleSourceChange = (sourceId: string) => {
    const source = dataSources.find((s) => s.id === sourceId);
    if (source) {
      setSelectedSource(sourceId);
      // Reset column selections
      setSelectedXColumn(null);
      setSelectedYColumns([]);
    }
  };

  const handleXColumnChange = (column: string) => {
    setSelectedXColumn(column);
  };

  const handleYColumnToggle = (column: string) => {
    setSelectedYColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const applyDataSource = () => {
    const source = dataSources.find((s) => s.id === selectedSource);
    if (source && selectedXColumn && selectedYColumns.length > 0) {
      // Transform data for chart
      const labels = source.data.map((row) => row[selectedXColumn]);
      const datasets = selectedYColumns.map((yColumn) => ({
        label: yColumn,
        data: source.data.map((row) => row[yColumn]),
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
        backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        },0.2)`,
      }));

      onConfigChange({
        data: {
          labels,
          datasets: datasets as any,
        },
      });
    }
  };

  const currentSource = dataSources.find((s) => s.id === selectedSource);
  const availableColumns = currentSource ? currentSource.columns : [];

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label className="block mb-2">Select Data Source</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedSource || ""}
          onChange={(e) => handleSourceChange(e.target.value)}
        >
          <option value="">Select a data source</option>
          {dataSources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      {currentSource && (
        <>
          <div className="mb-4">
            <label className="block mb-2">X-Axis Column</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedXColumn || ""}
              onChange={(e) => handleXColumnChange(e.target.value)}
            >
              <option value="">Select X-Axis Column</option>
              {availableColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Select Y-Axis Columns</label>
            <div className="grid grid-cols-2 gap-2">
              {availableColumns
                .filter((col) => col !== selectedXColumn)
                .map((column) => (
                  <label key={column} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedYColumns.includes(column)}
                      onChange={() => handleYColumnToggle(column)}
                      className="mr-2"
                    />
                    {column}
                  </label>
                ))}
            </div>
          </div>

          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={applyDataSource}
            disabled={!selectedXColumn || selectedYColumns.length === 0}
          >
            Apply Data Source
          </button>
        </>
      )}
    </div>
  );
};

export default DataSourceSelector;

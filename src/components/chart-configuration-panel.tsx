import React, { useState } from "react";
import {
  AdvancedChartConfig,
  SupportedChartType,
  Datasetstyling,
} from "../types";

interface AdvancedConfigPanelProps<T extends SupportedChartType> {
  config: AdvancedChartConfig<T>;
  onConfigChange: (config: Partial<AdvancedChartConfig<T>>) => void;
}

const AdvancedConfigurationPanel = <T extends SupportedChartType>({
  config,
  onConfigChange,
}: AdvancedConfigPanelProps<T>) => {
  const [activeTab, setActiveTab] = useState<
    "general" | "datasets" | "axes" | "styles"
  >("general");

  const updateConfig = (updates: Partial<AdvancedChartConfig<T>>) => {
    onConfigChange({
      ...config,
      ...updates,
    });
  };

  const updateDatasetStyling = (
    datasetIndex: number,
    styling: Partial<Datasetstyling>
  ) => {
    const updatedDatasets = config.data.datasets.map((dataset, index) =>
      index === datasetIndex ? { ...dataset, ...styling } : dataset
    );

    updateConfig({
      data: {
        ...config.data,
        datasets: updatedDatasets as any,
      },
    });
  };

  const renderGeneralTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">Chart Type</label>
        <select
          className="w-full p-2 border rounded"
          value={config.type}
          onChange={(e) =>
            updateConfig({
              type: e.target.value as T,
            })
          }
        >
          {["line", "bar", "pie", "doughnut", "radar", "polarArea"].map(
            (type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="block mb-2">Animation Duration (ms)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={config.options?.animation?.duration || 0}
          onChange={(e) =>
            updateConfig({
              options: {
                ...config.options,
                animation: {
                  ...config.options?.animation,
                  duration: Number(e.target.value),
                },
              } as any,
            })
          }
        />
      </div>

      <div>
        <label className="block mb-2">Animation Easing</label>
        <select
          className="w-full p-2 border rounded"
          value={config.options?.animation?.easing || "linear"}
          onChange={(e) =>
            updateConfig({
              options: {
                ...config.options,
                animation: {
                  ...config.options?.animation,
                  easing: e.target.value as
                    | "linear"
                    | "easeInQuad"
                    | "easeOutQuad"
                    | "easeInOutQuad",
                },
              } as any,
            })
          }
        >
          <option value="linear">Linear</option>
          <option value="easeInQuad">Ease In Quad</option>
          <option value="easeOutQuad">Ease Out Quad</option>
          <option value="easeInOutQuad">Ease In Out Quad</option>
        </select>
      </div>
    </div>
  );

  const renderDatasetsTab = () => (
    <div className="space-y-4">
      {config.data.datasets.map((dataset, index) => (
        <div key={index} className="border p-4 rounded">
          <h4 className="font-bold mb-2">Dataset {index + 1}</h4>

          <div className="mb-2">
            <label className="block mb-1">Label</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={dataset.label || ""}
              onChange={(e) => {
                const updatedDatasets = [...config.data.datasets];
                updatedDatasets[index].label = e.target.value;
                updateConfig({
                  data: {
                    ...config.data,
                    datasets: updatedDatasets,
                  },
                });
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Border Color</label>
              <input
                type="color"
                className="w-full p-1"
                value={(dataset.borderColor as string) || "#000000"}
                onChange={(e) =>
                  updateDatasetStyling(index, {
                    borderColor: e.target.value,
                  } as any)
                }
              />
            </div>

            <div>
              <label className="block mb-1">Border Width</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={dataset.borderWidth || (1 as any)}
                onChange={(e) =>
                  updateDatasetStyling(index, {
                    borderWidth: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1">Point Style</label>
              <select
                className="w-full p-2 border rounded"
                value={(dataset as any)?.pointStyle || "circle"}
                onChange={(e) =>
                  updateDatasetStyling(index, {
                    pointStyle: e.target.value as any,
                  })
                }
              >
                {[
                  "circle",
                  "cross",
                  "crossRot",
                  "dash",
                  "line",
                  "rect",
                  "rectRounded",
                  "rectRot",
                  "star",
                  "triangle",
                ].map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Line Tension</label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 border rounded"
                value={(dataset as any)?.tension || 0}
                onChange={(e) =>
                  updateDatasetStyling(index, {
                    tension: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAxesTab = () => (
    <div className="space-y-4">
      {["x", "y"].map((axis) => (
        <div key={axis} className="border p-4 rounded">
          <h4 className="font-bold mb-2">{axis.toUpperCase()} Axis</h4>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={
                  config.options?.scales?.[axis as "x" | "y"]?.title?.text || ""
                }
                onChange={(e) =>
                  updateConfig({
                    options: {
                      ...config.options,
                      scales: {
                        ...config.options?.scales,
                        [axis]: {
                          ...config.options?.scales?.[axis as "x" | "y"],
                          title: {
                            display: !!e.target.value,
                            text: e.target.value,
                          },
                        },
                      },
                    } as any,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-1">Title Color</label>
              <input
                type="color"
                className="w-full p-1"
                value={
                  (config.options?.scales?.[axis as "x" | "y"]?.title
                    ?.color as string) || "#000000"
                }
                onChange={(e) =>
                  updateConfig({
                    options: {
                      ...config.options,
                      scales: {
                        ...config.options?.scales,
                        [axis]: {
                          ...config.options?.scales?.[axis as "x" | "y"],
                          title: {
                            ...config.options?.scales?.[axis as "x" | "y"]
                              ?.title,
                            color: e.target.value,
                          },
                        },
                      },
                    } as any,
                  })
                }
              />
            </div>

            <div>
              <label className="check-container flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={
                    config.options?.scales?.[axis as "x" | "y"]?.grid
                      ?.display !== false
                  }
                  onChange={(e) =>
                    updateConfig({
                      options: {
                        ...config.options,
                        scales: {
                          ...config.options?.scales,
                          [axis]: {
                            ...config.options?.scales?.[axis as "x" | "y"],
                            grid: {
                              display: e.target.checked,
                            },
                          },
                        },
                      } as any,
                    })
                  }
                />
                <span>Show Grid</span>
              </label>
            </div>

            {config.options?.scales?.[axis as "x" | "y"]?.grid?.display && (
              <div>
                <label className="block mb-1">Grid Color</label>
                <input
                  type="color"
                  className="w-full p-1"
                  value={
                    (config.options?.scales?.[axis as "x" | "y"]?.grid
                      ?.color as string) || "#000000"
                  }
                  onChange={(e) =>
                    updateConfig({
                      options: {
                        ...config.options,
                        scales: {
                          ...config.options?.scales,
                          [axis]: {
                            ...config.options?.scales?.[axis as "x" | "y"],
                            grid: {
                              ...config.options?.scales?.[axis as "x" | "y"]
                                ?.grid,
                              color: e.target.value,
                            },
                          },
                        },
                      } as any,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStylesTab = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold mb-2">Title Styling</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={config.options?.plugins?.title?.text || ""}
              onChange={(e) =>
                updateConfig({
                  options: {
                    ...config.options,
                    plugins: {
                      ...config.options?.plugins,
                      title: {
                        ...config.options?.plugins?.title,
                        display: !!e.target.value,
                        text: e.target.value,
                      },
                    },
                  } as any,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-1">Title Color</label>
            <input
              type="color"
              className="w-full p-1"
              value={
                (config.options?.plugins?.title?.color as string) || "#000000"
              }
              onChange={(e) =>
                updateConfig({
                  options: {
                    ...config.options,
                    plugins: {
                      ...config.options?.plugins,
                      title: {
                        ...config.options?.plugins?.title,
                        color: e.target.value,
                      },
                    },
                  } as any,
                })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">Legend Styling</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">Position</label>
            <select
              className="w-full p-2 border rounded"
              value={config.options?.plugins?.legend?.position || "top"}
              onChange={(e) =>
                updateConfig({
                  options: {
                    ...config.options,
                    plugins: {
                      ...config.options?.plugins,
                      legend: {
                        ...config.options?.plugins?.legend,
                        position: e.target.value as
                          | "top"
                          | "bottom"
                          | "left"
                          | "right",
                      },
                    },
                  } as any,
                })
              }
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Label Color</label>
            <input
              type="color"
              className="w-full p-1"
              value={
                (config.options?.plugins?.legend?.labels?.color as string) ||
                "#000000"
              }
              onChange={(e) =>
                updateConfig({
                  options: {
                    ...config.options,
                    plugins: {
                      ...config.options?.plugins,
                      legend: {
                        ...config.options?.plugins?.legend,
                        labels: {
                          ...config.options?.plugins?.legend?.labels,
                          color: e.target.value,
                        },
                      },
                    },
                  } as any,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralTab();
      case "datasets":
        return renderDatasetsTab();
      case "axes":
        return renderAxesTab();
      case "styles":
        return renderStylesTab();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4 border-b">
        {[
          { key: "general", label: "General" },
          { key: "datasets", label: "Datasets" },
          { key: "axes", label: "Axes" },
          { key: "styles", label: "Styles" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`px-4 py-2 ${
              activeTab === key
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(key as any)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default AdvancedConfigurationPanel;

import React, { createContext, useState, useContext } from "react";

// Enhanced data source type
export interface DataSource {
  id: string;
  name: string;
  type: "static" | "dynamic";
  data: any[];
  columns: string[];
}

// Data management context
export interface DataManagementContextType {
  dataSources: DataSource[];
  addDataSource: (source: DataSource) => void;
  removeDataSource: (id: string) => void;
  updateDataSource: (id: string, updates: Partial<DataSource>) => void;
}

export const DataManagementContext = createContext<DataManagementContextType>({
  dataSources: [],
  addDataSource: () => {},
  removeDataSource: () => {},
  updateDataSource: () => {},
});

export const DataManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    // Default data sources
    {
      id: "sales_sample",
      name: "Sales Sample Data",
      type: "static",
      columns: ["Month", "Sales Volume", "Revenue"],
      data: [
        { Month: "January", "Sales Volume": 12, Revenue: 5000 },
        { Month: "February", "Sales Volume": 19, Revenue: 7500 },
        { Month: "March", "Sales Volume": 3, Revenue: 1500 },
        { Month: "April", "Sales Volume": 5, Revenue: 2500 },
        { Month: "May", "Sales Volume": 2, Revenue: 1000 },
      ],
    },
  ]);

  const addDataSource = (source: DataSource) => {
    setDataSources((prev) => [
      ...prev,
      { ...source, id: Date.now().toString() },
    ]);
  };

  const removeDataSource = (id: string) => {
    setDataSources((prev) => prev.filter((source) => source.id !== id));
  };

  const updateDataSource = (id: string, updates: Partial<DataSource>) => {
    setDataSources((prev) =>
      prev.map((source) =>
        source.id === id ? { ...source, ...updates } : source
      )
    );
  };

  return (
    <DataManagementContext.Provider
      value={{
        dataSources,
        addDataSource,
        removeDataSource,
        updateDataSource,
      }}
    >
      {children}
    </DataManagementContext.Provider>
  );
};

export const useDataManagement = () => useContext(DataManagementContext);

import { createContext, useState } from "react";

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0); // Shared state to trigger refresh

  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
  };

  return (
    <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

import { createContext, useState } from "react";
import asset1 from "./assets/model1.png";

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0); // Shared state to trigger refresh
  const [qrCode,setQrCode] = useState(asset1); // State to store the QR code
  const triggerRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
  };

  return (
    <RefreshContext.Provider value={{ refreshKey, triggerRefresh,qrCode,setQrCode }}>
      {children}
    </RefreshContext.Provider>
  );
};

import React, { createContext, useState, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [userid, setUserid] = useState(() => localStorage.getItem("userid"));

  return (
    <AuthContext.Provider value={{ userid, setUserid }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
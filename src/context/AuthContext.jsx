import React, { createContext, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getSession } from "@/api/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, loading, error, execute } = useFetch(getSession);

  const isAuthenticated = data?.session?.user?.role === "authenticated";


  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        data,
        isAuthenticated,
        execute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

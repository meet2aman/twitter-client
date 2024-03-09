"use client";
import { useState, createContext, useContext } from "react";

const LoaderContext = createContext({});

export const useLoader = () => {
  const loader = useContext(LoaderContext);
  return loader;
};

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

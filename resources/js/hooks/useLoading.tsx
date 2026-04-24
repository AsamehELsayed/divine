import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface LoadingContextType {
  progress: number;
  isLoaded: boolean;
  registerAsset: () => void;
  reportProgress: (amount?: number) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalAssets, setTotalAssets] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);

  const registerAsset = useCallback(() => {
    setTotalAssets((prev) => prev + 1);
  }, []);

  const reportProgress = useCallback((amount?: number) => {
    if (amount !== undefined) {
      setProgress(amount);
      if (amount >= 100) setIsLoaded(true);
    } else {
      setLoadedAssets((prev) => {
        const next = prev + 1;
        return next;
      });
    }
  }, []);

  useEffect(() => {
    if (totalAssets > 0) {
      const p = (loadedAssets / totalAssets) * 100;
      setProgress(p);
      if (loadedAssets >= totalAssets && totalAssets > 0) {
        // Add a small delay for visual polish
        const timer = setTimeout(() => setIsLoaded(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [loadedAssets, totalAssets]);

  const finishLoading = useCallback(() => {
    setProgress(100);
    setIsLoaded(true);
  }, []);

  return (
    <LoadingContext.Provider
      value={{ progress, isLoaded, registerAsset, reportProgress, finishLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading(required = true) {
  const context = useContext(LoadingContext);
  if (!context && required) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

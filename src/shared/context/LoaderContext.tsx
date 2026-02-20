// src/shared/context/LoaderContext.tsx
import { createContext, useContext, useState, type ReactNode, useCallback } from "react";

interface LoaderContextProps {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextProps>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  // fonctions stables avec useCallback pour éviter les re-renders inutiles
  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Hook pratique pour utiliser le loader dans n'importe quel composant
// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => useContext(LoaderContext);
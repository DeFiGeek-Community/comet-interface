import { useContext } from "react";
import AppPrimaryDataContext from "context/AppPrimaryDataContext";

export const useAppPrimaryDataContext = () => {
  const context = useContext(AppPrimaryDataContext);

  if (!context) {
    throw new Error(
      "useAppPrimaryDataContext must be used within a AppPrimaryDataProvider",
    );
  }

  return context;
};

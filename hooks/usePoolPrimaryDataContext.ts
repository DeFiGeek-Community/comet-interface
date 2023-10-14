import { useContext } from "react";
import PoolPrimaryDataContext from 'context/PoolPrimaryDataContext';

export const usePoolPrimaryDataContext = () => {
  const context = useContext(PoolPrimaryDataContext);

  if (!context) {
    throw new Error("usePoolPrimaryDataContext must be used within a PoolPrimaryDataProvider");
  }

  return context;
};

import { useContext } from "react";
import { PoolNameContext } from "context/PoolNameContext";

export const usePoolName = () => {
  const context = useContext(PoolNameContext);
  if (!context) {
    throw new Error("usePoolName must be used within a ChainPoolProvider");
  }
  return context;
};

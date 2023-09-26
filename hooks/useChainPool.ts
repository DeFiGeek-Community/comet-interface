import { useContext } from "react";
import { PoolContext } from "context/PoolContext";

export const useChainPool = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("useChainPool must be used within a ChainPoolProvider");
  }
  return context;
};

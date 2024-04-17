import { createContext, useContext } from "react";
import { PoolConfig } from "interfaces/pool";

interface PoolContextType {
  poolName: string;
  setPoolName: (poolName: string) => void;
  poolConfig: PoolConfig | undefined;
  setPoolConfig: (config: PoolConfig | undefined) => void;
  navigateToPageClick: (poolName?: string) => void;
}

export const PoolContext = createContext<PoolContextType | undefined>(
  undefined,
);

export const usePool = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("usePool must be used within a ChainPoolProvider");
  }
  return context;
};

export default PoolContext;

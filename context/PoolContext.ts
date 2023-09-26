import { createContext } from "react";

interface PoolContextType {
  chainId: number;
  poolName: string;
  setChainId: (chainId: number) => void;
  setPoolName: (poolName: string) => void;
}

export const PoolContext = createContext<PoolContextType | undefined>(
  undefined,
);

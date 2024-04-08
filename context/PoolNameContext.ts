import { createContext } from "react";

interface PoolNameContextType {
  poolName: string;
  setPoolName: (poolName: string) => void;
}

export const PoolNameContext = createContext<PoolNameContextType | undefined>(
  undefined,
);

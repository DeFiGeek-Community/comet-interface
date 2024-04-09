import React, { useState, ReactNode, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { PoolContext } from "context/PoolContext";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";

interface PoolProviderProps {
  children: ReactNode;
}

export const PoolProvider: React.FC<PoolProviderProps> = ({ children }) => {
  const [poolName, setPoolName] = useState<string>("");
  const [poolConfig, setPoolConfig] = useState<PoolConfig | undefined>(
    undefined,
  );
  const { chainId } = useAppData();

  useEffect(() => {
    if (chainId && poolName) {
      const config = POOL_CONFIG_MAP[chainId]?.[poolName];
      setPoolConfig(config);
    }
  }, [chainId, poolName]);

  const value = {
    poolName,
    setPoolName,
    poolConfig,
    setPoolConfig: (config: PoolConfig | undefined) => setPoolConfig(config),
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

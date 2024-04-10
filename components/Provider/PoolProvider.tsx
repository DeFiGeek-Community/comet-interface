import React, { useState, ReactNode, useEffect } from "react";
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
  const { config } = useAppData();

  useEffect(() => {
    if (config && poolName) {
      setPoolConfig(config?.[poolName]);
    }
  }, [config, poolName]);

  const value = {
    poolName,
    setPoolName,
    poolConfig,
    setPoolConfig: (config: PoolConfig | undefined) => setPoolConfig(config),
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

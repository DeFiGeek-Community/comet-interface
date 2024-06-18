import React, { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
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
  const { config, setPageName } = useAppData();

  useEffect(() => {
    if (config && poolName) {
      setPoolConfig(config?.[poolName]);
    }
  }, [config, poolName]);

  const router = useRouter();

  const navigateToPageClick = (targetPoolName: string = "") => {
    setPoolName(targetPoolName);
    setPageName(targetPoolName ? "pool" : "list");
    router.push(
      targetPoolName ? `/pool?pool=${targetPoolName}` : "/",
      undefined,
      { shallow: true },
    );
    window.scrollTo(0, 0);
  };

  const value = {
    poolName,
    setPoolName,
    poolConfig,
    setPoolConfig: (config: PoolConfig | undefined) => setPoolConfig(config),
    navigateToPageClick,
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

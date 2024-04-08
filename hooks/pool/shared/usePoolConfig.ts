import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { usePoolName } from "hooks/usePoolName";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";

const usePoolConfig = () => {
  const { chainId } = useAppData();
  const { poolName } = usePoolName();
  const [poolConfig, setPoolConfig] = useState<PoolConfig | undefined>();

  useEffect(() => {
    if (chainId && poolName) {
      const config = POOL_CONFIG_MAP[chainId]?.[poolName];
      setPoolConfig(config);
    }
  }, [chainId, poolName]);

  return poolConfig;
};

export default usePoolConfig;

import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useChainPool } from "hooks/useChainPool";
import { PoolConfig } from "interfaces/pool";

const usePoolConfig = () => {
  const { chainId, poolName } = useChainPool();
  const [poolConfig, setPoolConfig] = useState<PoolConfig>();

  useEffect(() => {
    if (chainId && poolName) {
      const config = POOL_CONFIG_MAP[chainId]?.[poolName];
      if (config) {
        setPoolConfig(config);
      }
    }
  }, [chainId, poolName]);

  return poolConfig;
};

export default usePoolConfig;

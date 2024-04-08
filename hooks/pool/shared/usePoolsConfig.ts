import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useChainPool } from "hooks/useChainPool";
import { PoolConfigMapForList } from "interfaces/pool";

const usePoolsConfig = () => {
  const { chainId } = useChainPool();
  const [config, setConfig] = useState<PoolConfigMapForList | undefined>();

  useEffect(() => {
    if (chainId) {
      const config = POOL_CONFIG_MAP[chainId];
      setConfig(config);
    }
  }, [chainId]);

  return config;
};

export default usePoolsConfig;

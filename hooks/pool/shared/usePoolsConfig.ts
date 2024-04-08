import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useAppData } from "context/AppDataContext";
import { PoolConfigMapForList } from "interfaces/pool";

const usePoolsConfig = () => {
  const { chainId } = useAppData();
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

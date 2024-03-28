import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useChainPool } from "hooks/useChainPool";
import { PoolConfigMapForList } from "interfaces/pool";

const usePoolConfigForPoolList = () => {
  const { chainId, poolName } = useChainPool();
  const [poolConfigs, setPoolConfigs] = useState<
    PoolConfigMapForList | undefined
  >();

  useEffect(() => {
    if (chainId && poolName) {
      const configs = POOL_CONFIG_MAP[chainId];
      setPoolConfigs(configs);
    }
  }, [chainId, poolName]);

  return poolConfigs;
};

export default usePoolConfigForPoolList;

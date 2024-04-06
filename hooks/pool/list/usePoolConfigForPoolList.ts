import { useState, useEffect } from "react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useChainPool } from "hooks/useChainPool";
import { PoolConfigMapForList } from "interfaces/pool";

const usePoolConfigForPoolList = () => {
  const { chainId, poolName } = useChainPool();
  const [poolConfigs, setPoolConfigs] = useState<
    PoolConfigMapForList | undefined
  >();
  const [chainConfigForCJPY, setChainConfigForCJPY] = useState<
    number | undefined
  >(1);
  const [chainConfigForUSDC, setChainConfigForUSDC] = useState<
    number | undefined
  >(1);
  const [chainConfigForcrvUSD, setChainConfigForcrvUSD] = useState<
    number | undefined
  >(1);
  const [chainConfigForWETH, setChainConfigForWETH] = useState<
    number | undefined
  >(1);

  useEffect(() => {
    if (chainId && poolName) {
      const configs = POOL_CONFIG_MAP[chainId];
      setPoolConfigs(configs);
      setChainConfigForCJPY(chainId);
      setChainConfigForUSDC(chainId);
      setChainConfigForcrvUSD(chainId);
      setChainConfigForWETH(chainId);
    }
  }, [chainId, poolName]);

  return {
    poolConfigs,
    chainId
  };
};

export default usePoolConfigForPoolList;

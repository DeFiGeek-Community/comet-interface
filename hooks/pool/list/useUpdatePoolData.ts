import { useEffect } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

interface PoolDataComponentProps {
  poolConfig: PoolConfig;
}

const useUpdatePoolData = ({ poolConfig }: PoolDataComponentProps) => {
  const {
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const { priceFeedData } = usePriceFeedData(poolConfig);

  useEffect(() => {
    if (priceFeedData && priceObject[poolName] !== priceFeedData) {
      updatePriceFeedData(poolName, priceFeedData);
    }
  }, [poolConfig, priceFeedData, updatePriceFeedData]);

  const { totalPoolData } = useTotalPoolData(poolConfig);

  useEffect(() => {
    if (totalPoolData && totalPoolObject[poolName] !== totalPoolData) {
      updateTotalPoolData(poolName, totalPoolData);
    }
  }, [poolConfig, totalPoolData, updateTotalPoolData]);

  return {
    priceFeedData: priceFeedData ? priceObject[poolName] : undefined,
    totalPoolData: totalPoolData ? totalPoolObject[poolName] : undefined,
  };
};

export default useUpdatePoolData;

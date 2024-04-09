import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

interface PoolDataComponentProps {
  poolConfig: PoolConfig;
}

const useUpdatePoolData = ({ poolConfig }: PoolDataComponentProps) => {
  const {
    chainId,
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const { priceFeedData } = usePriceFeedData(poolConfig);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (priceFeedData && priceObject[poolName] !== priceFeedData) {
      updatePriceFeedData(poolName, priceFeedData);
    }
  }, [poolConfig, priceFeedData]);

  const { totalPoolData } = useTotalPoolData(poolConfig);

  useEffect(() => {
    if (totalPoolData && totalPoolObject[poolName] !== totalPoolData) {
      updateTotalPoolData(poolName, totalPoolData);
    }
  }, [poolConfig, totalPoolData]);

  useEffect(() => {
    if (isFirstRender.current) {
      // 初回レンダリング時は何もしない
      isFirstRender.current = false;
    } else {
      // 2回目以降のレンダリングでchainIdが変更された場合にローディング状態をtrueにする
      if (chainId) {
        setIsLoading(true);
      }
    }
  }, [chainId]);

  useEffect(() => {
    // データが取得し終わったらfalseにする
    if (priceFeedData && totalPoolData) {
      setIsLoading(false);
    }
  }, [priceFeedData, totalPoolData]);

  return {
    priceFeedData: !isLoading ? priceObject[poolName] : undefined,
    totalPoolData: !isLoading ? totalPoolObject[poolName] : undefined,
  };
};

export default useUpdatePoolData;

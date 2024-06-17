import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";

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
    baseAssetData: baseAssetObject,
    updateBaseAssetData,
    collateralAssetData: collateralAssetObject,
    updateCollateralAssetData,
  } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  const { priceFeedData } = usePriceFeedData(poolConfig);

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

  const { baseAssetData } = useBaseAsset(poolConfig);

  useEffect(() => {
    if (baseAssetData && baseAssetObject[poolName] !== baseAssetData) {
      updateBaseAssetData(poolName, baseAssetData);
    }
  }, [poolConfig, baseAssetData]);

  const { collateralAssetsData } = useCollateralAssets(poolConfig);

  useEffect(() => {
    if (collateralAssetsData && collateralAssetObject[poolName] !== collateralAssetsData) {
      updateCollateralAssetData(poolName, collateralAssetsData);
    }
  }, [poolConfig, collateralAssetsData]);


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
    if (priceFeedData && totalPoolData && baseAssetData && collateralAssetsData) {
      setIsLoading(false);
    }
  }, [priceFeedData, totalPoolData, baseAssetData, collateralAssetsData]);

  return {
    priceFeedData: !isLoading ? priceObject[poolName] : undefined,
    totalPoolData: !isLoading ? totalPoolObject[poolName] : undefined,
    baseAssetData: !isLoading ? baseAssetObject[poolName] : undefined,
    collateralAssetData: !isLoading ? collateralAssetObject[poolName] : undefined,
  };
};

export default useUpdatePoolData;

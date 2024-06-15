// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useEffect, useState, useRef } from "react";
import AppPrimaryDataContext from "context/AppPrimaryDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { useAppData } from "context/AppDataContext";

interface AppPrimaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: React.ReactNode;
}

export const AppPrimaryDataProvider: React.FC<AppPrimaryDataProviderProps> = ({
  poolData,
  children,
}) => {
  const {
    chainId,
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
    baseAssetData: baseAssetObject,
    updateBaseAssetData,
    collateralAssetsData: collateralAssetsObject,
    updateCollateralAssetsData,
  } = useAppData();
  const poolName = poolData?.baseToken.symbol ?? "";
  const { priceFeedData } = usePriceFeedData(poolData);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (priceFeedData && priceObject[poolName] !== priceFeedData) {
      updatePriceFeedData(poolName, priceFeedData);
    }
  }, [poolName, priceFeedData]);

  const { baseAssetData } = useBaseAsset(poolData);
  const { collateralAssetsData } = useCollateralAssets(poolData);
  const { totalPoolData } = useTotalPoolData(poolData);

  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (totalPoolData && totalPoolObject[poolName] !== totalPoolData) {
      updateTotalPoolData(poolName, totalPoolData);
    }
  }, [poolName, totalPoolData]);

  useEffect(() => {
    if (baseAssetData && baseAssetObject[poolName] !== baseAssetData) {
      updateBaseAssetData(poolName, baseAssetData);
    }
  }, [poolName, baseAssetData]);

  useEffect(() => {
    if (
      collateralAssetsData &&
      collateralAssetsObject[poolName] !== collateralAssetsData
    ) {
      updateCollateralAssetsData(poolName, collateralAssetsData);
    }
  }, [poolName, collateralAssetsData]);

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
    if (
      priceFeedData &&
      totalPoolData &&
      baseAssetData &&
      collateralAssetsData
    ) {
      setIsLoading(false);
    }
  }, [priceFeedData, totalPoolData, baseAssetData, collateralAssetsData]);

  return (
    <AppPrimaryDataContext.Provider
      value={{
        priceFeedData: !isLoading ? priceObject[poolName] : undefined,
        baseAssetData: !isLoading ? baseAssetObject[poolName] : undefined,
        collateralAssetsData: !isLoading
          ? collateralAssetsObject[poolName]
          : undefined,
        totalPoolData: !isLoading ? totalPoolObject[poolName] : undefined,
      }}
    >
      {children}
    </AppPrimaryDataContext.Provider>
  );
};

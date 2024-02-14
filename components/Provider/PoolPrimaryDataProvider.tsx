// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useEffect } from "react";
import PoolPrimaryDataContext from "context/PoolPrimaryDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useClaimReward from "hooks/pool/indivisual/useClaimReward";
import { useAppData } from "context/AppDataContext";

interface PoolPrimaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: React.ReactNode;
}

export const PoolPrimaryDataProvider: React.FC<
  PoolPrimaryDataProviderProps
> = ({ poolData, children }) => {
  const {
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();
  const poolName = poolData?.baseToken.symbol ?? "";
  const { priceFeedData } = usePriceFeedData(poolData);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (!priceObject[poolName] && priceFeedData) {
      updatePriceFeedData(poolName, priceFeedData);
    }
  }, [poolName, priceFeedData, priceObject, updatePriceFeedData]);

  const { baseAssetData } = useBaseAsset(poolData);
  const { collateralAssetsData } = useCollateralAssets(poolData);
  const { totalPoolData } = useTotalPoolData(poolData);

  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (!totalPoolObject[poolName] && totalPoolData) {
      updateTotalPoolData(poolName, totalPoolData);
    }
  }, [poolName, totalPoolData, totalPoolObject, updateTotalPoolData]);

  const { claimReward } = useClaimReward(poolData);

  return (
    <PoolPrimaryDataContext.Provider
      value={{
        priceFeedData: priceFeedData,
        baseAssetData,
        collateralAssetsData,
        totalPoolData,
        claimReward,
      }}
    >
      {children}
    </PoolPrimaryDataContext.Provider>
  );
};

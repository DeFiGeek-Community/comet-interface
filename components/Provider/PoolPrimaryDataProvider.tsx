// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useEffect, useState, useRef } from "react";
import PoolPrimaryDataContext from "context/PoolPrimaryDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { useAppData } from "context/AppDataContext";
import useUpdatePoolData from "hooks/pool/list/useUpdatePoolData"; // useUpdatePoolData フックをインポート

interface PoolPrimaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: React.ReactNode;
}

export const PoolPrimaryDataProvider: React.FC<
  PoolPrimaryDataProviderProps
> = ({ poolData, children }) => {

  if (!poolData) {
    return undefined;
  }

  const { priceFeedData, totalPoolData, baseAssetData, collateralAssetData } = useUpdatePoolData({ poolConfig: poolData });

  return (
    <PoolPrimaryDataContext.Provider
      value={{
        priceFeedData,
        baseAssetData,
        collateralAssetsData: collateralAssetData,
        totalPoolData,
      }}
    >
      {children}
    </PoolPrimaryDataContext.Provider>
  );
};

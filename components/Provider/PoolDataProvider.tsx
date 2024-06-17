// components/Provider/PoolDataProvider.tsx
import React from "react";
import PoolDataContext from "context/PoolDataContext";
import { PoolConfig } from "interfaces/pool";
import useUpdatePoolData from "hooks/pool/list/useUpdatePoolData";

interface PoolDataProviderProps {
  poolData: PoolConfig | undefined;
  children: React.ReactNode;
}

export const PoolDataProvider: React.FC<PoolDataProviderProps> = ({
  poolData,
  children,
}) => {
  const {
    priceFeedData,
    totalPoolData,
    baseAssetData,
    collateralAssetData,
    tokenRewardData,
    positionSummary,
  } = useUpdatePoolData({ poolConfig: poolData });

  return (
    <PoolDataContext.Provider
      value={{
        priceFeedData,
        baseAssetData,
        collateralAssetsData: collateralAssetData,
        totalPoolData,
        tokenRewardData,
        positionSummary,
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
};

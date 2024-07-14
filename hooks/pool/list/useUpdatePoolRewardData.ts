import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";

interface PoolDataComponentProps {
  poolConfig: PoolConfig;
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
}

export interface TokenRewardData {
  supplyRewardAPR: number | undefined;
  borrowRewardAPR: number | undefined;
}

export interface PoolRewardData {
  tokenRewardData: TokenRewardData | undefined;
}

const useUpdatePoolRewardData = ({
  poolConfig,
  priceFeedData,
  baseAssetData,
  collateralAssetsData,
  totalPoolData,
}: PoolDataComponentProps) => {
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  const { tokenRewardData } = useTokenRewardData(poolConfig, {
    priceFeedData,
    baseAssetData,
    collateralAssetsData,
    totalPoolData,
  });

  return {
    tokenRewardData,
  };
};

export default useUpdatePoolRewardData;

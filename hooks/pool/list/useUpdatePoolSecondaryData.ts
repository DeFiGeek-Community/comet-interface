import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { useAppSecondaryData } from "context/AppSecondaryDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import { PoolPrimaryDataContextType } from "context/PoolPrimaryDataContext";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface AppDataContextType {
    priceFeedData: PriceFeedData | undefined;
    baseAssetData: BaseAssetData | undefined;
    collateralAssetsData: CollateralAssetsData | undefined;
    totalPoolData: TotalPoolData | undefined ;
  }

interface PoolSecondaryDataComponentProps {
  poolConfig: PoolConfig;
  appData: AppDataContextType | undefined;
}

const useUpdatePoolSecondaryData = ({
  poolConfig,
  appData,
}: PoolSecondaryDataComponentProps) => {
  const {
    chainId,
    tokenRewardData: tokenRewardObject,
    updateTokenRewardData,
  } = useAppSecondaryData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  const { tokenRewardData } = useTokenRewardData(poolConfig, appData);

  useEffect(() => {
    if (tokenRewardData && tokenRewardObject[poolName] !== tokenRewardData) {
      updateTokenRewardData(poolName, tokenRewardData);
    }
  }, [poolConfig, tokenRewardData]);

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
    if (tokenRewardData) {
      setIsLoading(false);
    }
  }, [tokenRewardData]);

  return {
    tokenRewardData: !isLoading ? tokenRewardObject[poolName] : undefined,
  };
};

export default useUpdatePoolSecondaryData;

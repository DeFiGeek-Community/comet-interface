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

const useUpdatePoolRewardData = ({ poolConfig, priceFeedData, baseAssetData, collateralAssetsData, totalPoolData }: PoolDataComponentProps) => {
  // const {
  //   chainId,
  //   priceFeedData: priceObject,
  //   totalPoolData: totalPoolObject,
  //   baseAssetData: baseAssetObject,
  //   collateralAssetsData: collateralAssetsObject,
  //   tokenRewardData: tokenRewardObject,
  //   updateTokenRewardData,
  // } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  // const tokenRewardData: number | undefined = 0;

  const { tokenRewardData } = useTokenRewardData(poolConfig, {
    priceFeedData,
    baseAssetData,
    collateralAssetsData,
    totalPoolData,
  });

  // const { tokenRewardData } = useTokenRewardData(poolConfig, {
  //   priceFeedData: priceObject[poolName],
  //   baseAssetData: baseAssetObject[poolName],
  //   collateralAssetsData: collateralAssetsObject[poolName],
  //   totalPoolData: totalPoolObject[poolName],
  // });

  // useEffect(() => {
  //   if (tokenRewardData && tokenRewardObject[poolName] !== tokenRewardData) {
  //     updateTokenRewardData(poolName, tokenRewardData);
  //   }
  // }, [poolConfig, tokenRewardData]);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     // 初回レンダリング時は何もしない
  //     isFirstRender.current = false;
  //   } else {
  //     // 2回目以降のレンダリングでchainIdが変更された場合にローディング状態をtrueにする
  //     if (chainId) {
  //       setIsLoading(true);
  //     }
  //   }
  // }, [chainId]);

  // useEffect(() => {
  //   // データが取得し終わったらfalseにする
  //   if (tokenRewardData) {
  //     setIsLoading(false);
  //   }
  // }, [tokenRewardData]);

  return {
    // tokenRewardData: !isLoading ? tokenRewardObject[poolName] : undefined,
    tokenRewardData,
  };
};

export default useUpdatePoolRewardData;

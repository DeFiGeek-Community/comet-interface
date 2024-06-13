import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";

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
    collateralAssetsData: collateralAssetsObject,
    updateCollateralAssetsData,
    tokenRewardData: tokenRewardObject,
    updateTokenRewardData,
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

  const { baseAssetData } = useBaseAsset(poolConfig);

  useEffect(() => {
    if (baseAssetData && baseAssetObject[poolName] !== baseAssetData) {
      updateBaseAssetData(poolName, baseAssetData);
    }
  }, [poolConfig, baseAssetData]);

  const { collateralAssetsData } = useCollateralAssets(poolConfig);

  useEffect(() => {
    if (
      collateralAssetsData &&
      collateralAssetsObject[poolName] !== collateralAssetsData
    ) {
      updateCollateralAssetsData(poolName, collateralAssetsData);
    }
  }, [poolConfig, collateralAssetsData]);

  // const { tokenRewardData } = useTokenRewardData(poolConfig, { priceObject[poolName], baseAssetObject[poolName], collateralAssetsObject[poolName], totalPoolObject[poolName] } );
  const { tokenRewardData } = useTokenRewardData(poolConfig, {
    priceFeedData: priceObject[poolName],
    baseAssetData: baseAssetObject[poolName],
    collateralAssetsData: collateralAssetsObject[poolName],
    totalPoolData: totalPoolObject[poolName]
  });

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
    if (
      priceFeedData &&
      totalPoolData &&
      baseAssetData &&
      collateralAssetsData &&
      tokenRewardData
    ) {
      setIsLoading(false);
    }
  }, [priceFeedData, totalPoolData, baseAssetData, collateralAssetsData, tokenRewardData]);

  return {
    priceFeedData: !isLoading ? priceObject[poolName] : undefined,
    totalPoolData: !isLoading ? totalPoolObject[poolName] : undefined,
    baseAssetData: !isLoading ? baseAssetObject[poolName] : undefined,
    collateralAssetsData: !isLoading
      ? collateralAssetsObject[poolName]
      : undefined,
      tokenRewardData: !isLoading ? tokenRewardObject[poolName] : undefined,
  };
};

export default useUpdatePoolData;

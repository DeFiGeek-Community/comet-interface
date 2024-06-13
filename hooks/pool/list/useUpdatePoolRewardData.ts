import { useEffect, useState, useRef } from "react";
import { useAppData } from "context/AppDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import { PoolPrimaryDataContextType } from "context/PoolPrimaryDataContext";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";

interface PoolRewardDataComponentProps {
  poolConfig: PoolConfig;
  primaryData: PoolPrimaryDataContextType | undefined,
}

const useUpdatePoolRewardData = ({ poolConfig, primaryData }: PoolRewardDataComponentProps) => {
  const {
    chainId,
    tokenRewardData: tokenRewardObject,
    updateTokenRewardData,
  } = useAppData();
  const poolName = poolConfig?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  const { tokenRewardData } = useTokenRewardData(poolConfig, primaryData);

  useEffect(() => {
    if (
        tokenRewardData &&
        tokenRewardObject[poolName] !== tokenRewardData
    ) {
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
        tokenRewardData
    ) {
      setIsLoading(false);
    }
  }, [tokenRewardData]);

  return {
    tokenRewardData: !isLoading ? tokenRewardObject[poolName] : undefined,
  };
};

export default useUpdatePoolRewardData;

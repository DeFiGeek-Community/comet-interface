import React, { useState, useEffect, useRef } from "react";
import { PoolConfig } from "interfaces/pool";
import AppSecondaryDataContext from "context/AppSecondaryDataContext";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import usePositionSummary from "hooks/pool/indivisual/usePositionSummary";
import { useAppPrimaryDataContext } from "hooks/pool/useAppPrimaryDataContext";
import { useAppData } from "context/AppDataContext";

interface AppSecondaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const AppSecondaryDataProvider: React.FC<
  AppSecondaryDataProviderProps
> = ({ poolData, children }) => {
  const {
    chainId,
    tokenRewardData: tokenRewardObject,
    updateTokenRewardData,
  } = useAppData();
  const primaryData = useAppPrimaryDataContext();
  const { tokenRewardData } = useTokenRewardData(poolData, primaryData);
  const poolName = poolData?.baseToken.symbol ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

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

  return (
    <AppSecondaryDataContext.Provider
      value={{
        tokenRewardData: !isLoading ? tokenRewardData : undefined,
      }}
    >
      {children}
    </AppSecondaryDataContext.Provider>
  );
};

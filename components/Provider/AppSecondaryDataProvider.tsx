import React, { useState, ReactNode, useEffect, useRef } from "react";
import { useNetwork } from "wagmi";
import {
  AppSecondaryDataContext,
  Currency,
  AppSecondaryDataContextType,
} from "context/AppSecondaryDataContext";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { PoolConfigMapForList } from "interfaces/pool";
import { POOL_CONFIG_MAP } from "constants/pools";
import { BaseAssetData } from "../../hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "../../hooks/pool/indivisual/useCollateralAssets";
import { TokenRewardData } from "../../hooks/pool/shared/useTokenReward";

export const AppSecondaryDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageName, setPageName] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const [config, setConfig] = useState<PoolConfigMapForList | undefined>();
  const { chain } = useNetwork();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (chain) {
      setConfig(POOL_CONFIG_MAP[chain.id]);
      setChainId(chain.id);
    } else {
      setConfig(POOL_CONFIG_MAP[1]);
    }
  }, [chain, setChainId]);
  const [tokenRewardData, setTokenRewardData] = useState<{
    [poolName: string]: TokenRewardData | undefined;
  }>({});

  const [usdjpyPrice, setUsdjpyPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    // 初回のレンダリングをスキップ
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // addressが存在し、初回のレンダリングではない場合にreloadを実行
    if (chain) {
      setTokenRewardData({});
    }
  }, [chain]);

  const updateTokenRewardData = (
    poolName: string,
    data: TokenRewardData | undefined,
  ) => {
    setTokenRewardData((prevData) => ({ ...prevData, [poolName]: data }));
  };

  const [currency, setCurrency] = useState<Currency>("USD");
  const [rate, setRate] = useState<number>(1);

  const toggleCurrency = () => {
    if (usdjpyPrice !== undefined) {
      setCurrency((prevCurrency) => {
        const newCurrency = prevCurrency === "USD" ? "JPY" : "USD";
        setRate(newCurrency === "JPY" ? usdjpyPrice : 1);
        return newCurrency;
      });
    }
  };

  const value: AppSecondaryDataContextType = {
    pageName,
    setPageName,
    chainId,
    config,
    tokenRewardData,
    updateTokenRewardData,
  };

  return (
    <AppSecondaryDataContext.Provider value={value}>
      {children}
    </AppSecondaryDataContext.Provider>
  );
};

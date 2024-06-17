import React, { useState, ReactNode, useEffect, useRef } from "react";
import { useNetwork } from "wagmi";
import {
  AppDataContext,
  Currency,
  AppDataContextType,
} from "context/AppDataContext";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { PoolConfigMapForList } from "interfaces/pool";
import { POOL_CONFIG_MAP } from "constants/pools";

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
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

  const [priceFeedData, setPriceFeedData] = useState<{
    [poolName: string]: PriceFeedData | undefined;
  }>({});
  const [totalPoolData, setTotalPoolData] = useState<{
    [poolName: string]: TotalPoolData | undefined;
  }>({});
  const [baseAssetData, setBaseAssetData] = useState<{
    [poolName: string]: BaseAssetData | undefined;
  }>({});
  const [collateralAssetData, setCollateralAssetData] = useState<{
    [poolName: string]: CollateralAssetsData | undefined;
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
      setPriceFeedData({});
      setTotalPoolData({});
      setBaseAssetData({});
      setCollateralAssetData({});
    }
  }, [chain]);

  const updatePriceFeedData = (
    poolName: string,
    data: PriceFeedData | undefined
  ) => {
    setPriceFeedData((prevData) => ({ ...prevData, [poolName]: data }));
    setUsdjpyPrice(data?.usdjpy);
  };

  const updateTotalPoolData = (
    poolName: string,
    data: TotalPoolData | undefined
  ) => {
    setTotalPoolData((prevData) => ({ ...prevData, [poolName]: data }));
  };

  const updateBaseAssetData = (
    poolName: string,
    data: BaseAssetData | undefined
  ) => {
    setBaseAssetData((prevData) => ({ ...prevData, [poolName]: data }));
  };

  const updateCollateralAssetData = (
    poolName: string,
    data: CollateralAssetsData | undefined
  ) => {
    setCollateralAssetData((prevData) => ({ ...prevData, [poolName]: data }));
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

  const value: AppDataContextType = {
    pageName,
    setPageName,
    chainId,
    config,
    priceFeedData,
    updatePriceFeedData,
    totalPoolData,
    updateTotalPoolData,
    baseAssetData,
    updateBaseAssetData,
    collateralAssetData,
    updateCollateralAssetData,
    currency,
    rate,
    toggleCurrency,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

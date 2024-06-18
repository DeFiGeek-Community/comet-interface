import React, { useState, ReactNode, useEffect, useRef } from "react";
import { useNetwork } from "wagmi";
import {
  AppDataContext,
  Currency,
  AppDataContextType,
} from "context/AppDataContext";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { PositionSummary } from "hooks/pool/indivisual/usePositionSummary";
import { PoolConfigMapForList } from "interfaces/pool";
import { POOL_CONFIG_MAP } from "constants/pools";
import { BaseAssetData } from "../../hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "../../hooks/pool/indivisual/useCollateralAssets";
import { TokenRewardData } from "../../hooks/pool/shared/useTokenReward";

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

  const [priceFeedMapping, setPriceFeedMapping] = useState<{
    [poolName: string]: PriceFeedData | undefined;
  }>({});
  const [totalPoolMapping, setTotalPoolMapping] = useState<{
    [poolName: string]: TotalPoolData | undefined;
  }>({});
  const [baseAssetMapping, setBaseAssetMapping] = useState<{
    [poolName: string]: BaseAssetData | undefined;
  }>({});
  const [collateralAssetMapping, setCollateralAssetMapping] = useState<{
    [poolName: string]: CollateralAssetsData | undefined;
  }>({});
  const [tokenRewardMapping, setTokenRewardMapping] = useState<{
    [poolName: string]: TokenRewardData | undefined;
  }>({});
  const [positionSummaryMapping, setPositionSummaryMapping] = useState<{
    [poolName: string]: PositionSummary | undefined;
  }>({});
  const [usdjpyPrice, setUsdjpyPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (chain) {
      setPriceFeedMapping({});
      setTotalPoolMapping({});
      setBaseAssetMapping({});
      setCollateralAssetMapping({});
      setTokenRewardMapping({});
      setPositionSummaryMapping({});
    }
  }, [chain]);

  const updateData = <T,>(
    dataType: keyof AppDataContextType,
    poolName: string,
    data: T,
  ) => {
    switch (dataType) {
      case "priceFeedMapping":
        setPriceFeedMapping((prevData) => ({
          ...prevData,
          [poolName]: data as PriceFeedData,
        }));
        break;
      case "totalPoolMapping":
        setTotalPoolMapping((prevData) => ({
          ...prevData,
          [poolName]: data as TotalPoolData,
        }));
        break;
      case "baseAssetMapping":
        setBaseAssetMapping((prevData) => ({
          ...prevData,
          [poolName]: data as BaseAssetData,
        }));
        break;
      case "collateralAssetMapping":
        setCollateralAssetMapping((prevData) => ({
          ...prevData,
          [poolName]: data as CollateralAssetsData,
        }));
        break;
      case "tokenRewardMapping":
        setTokenRewardMapping((prevData) => ({
          ...prevData,
          [poolName]: data as TokenRewardData,
        }));
        break;
      case "positionSummaryMapping":
        setPositionSummaryMapping((prevData) => ({
          ...prevData,
          [poolName]: data as PositionSummary,
        }));
        break;
      default:
        console.warn(`Unknown data type: ${dataType}`);
    }
  };

  const updateBaseAssetData = (
    poolName: string,
    data: BaseAssetData | undefined,
  ) => {
    setBaseAssetMapping((prevData) => ({ ...prevData, [poolName]: data }));
  };

  const updateCollateralAssetsData = (
    poolName: string,
    data: CollateralAssetsData | undefined,
  ) => {
    setCollateralAssetMapping((prevData) => ({ ...prevData, [poolName]: data }));
  };

  const updateTokenRewardData = (
    poolName: string,
    data: TokenRewardData | undefined,
  ) => {
    setTokenRewardMapping((prevData) => ({ ...prevData, [poolName]: data }));
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
    priceFeedMapping,
    totalPoolMapping,
    baseAssetMapping,
    collateralAssetMapping,
    tokenRewardMapping,
    positionSummaryMapping,
    updateData,
    currency,
    rate,
    toggleCurrency,
    baseAssetData: baseAssetMapping,
    updateBaseAssetData,
    collateralAssetsData: collateralAssetMapping,
    updateCollateralAssetsData,
    tokenRewardData: tokenRewardMapping, 
    updateTokenRewardData, 
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

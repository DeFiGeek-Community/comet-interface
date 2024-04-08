import React, { useState, ReactNode, useEffect } from "react";
import { useNetwork } from "wagmi";
import {
  AppDataContext,
  Currency,
  AppDataContextType,
} from "context/AppDataContext";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pageName, setPageName] = useState<string>("");
  const [chainId, setChainId] = useState<number>(0);
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain, setChainId]);

  const [priceFeedData, setPriceFeedData] = useState<{
    [poolName: string]: PriceFeedData | undefined;
  }>({});
  const [totalPoolData, setTotalPoolData] = useState<{
    [poolName: string]: TotalPoolData | undefined;
  }>({});
  const [usdjpyPrice, setUsdjpyPrice] = useState<number | undefined>(undefined);

  const updatePriceFeedData = (poolName: string, data: PriceFeedData) => {
    setPriceFeedData((prevData) => ({ ...prevData, [poolName]: data }));
    setUsdjpyPrice(data?.usdjpy);
  };

  const updateTotalPoolData = (poolName: string, data: TotalPoolData) => {
    setTotalPoolData((prevData) => ({ ...prevData, [poolName]: data }));
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
    priceFeedData,
    updatePriceFeedData,
    totalPoolData,
    updateTotalPoolData,
    currency,
    rate,
    toggleCurrency,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

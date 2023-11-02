import React, { ReactNode, useState } from "react";
import { CurrencyContext } from "context/currencyContext";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";

type Currency = "USD" | "JPY";

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const { priceFeedData } = usePoolPrimaryDataContext();

  const [currency, setCurrency] = useState<Currency>("USD");
  const usdjpy = priceFeedData?.usdjpy;

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "JPY" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, usdjpy, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

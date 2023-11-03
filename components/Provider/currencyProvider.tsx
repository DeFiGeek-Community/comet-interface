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

  let rate: number | undefined;

  if (currency === "USD") {
    rate = 1;
  } else if (currency === "JPY") {
    rate = priceFeedData?.usdjpy;
  }

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "JPY" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, rate, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

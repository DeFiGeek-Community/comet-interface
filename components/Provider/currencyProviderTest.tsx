import React, { ReactNode, useState } from "react";
import { CurrencyContext } from "context/currencyContext";

type Currency = "USD" | "JPY";

type CurrencyProviderProps = {
  children: ReactNode;
};

export const CurrencyProviderTest = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<Currency>("USD");

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "JPY" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

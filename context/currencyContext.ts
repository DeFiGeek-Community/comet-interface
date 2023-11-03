import { createContext, useContext } from "react";

type Currency = "USD" | "JPY";

type CurrencyContextType = {
  currency: Currency;
  rate?: number;
  toggleCurrency: () => void;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

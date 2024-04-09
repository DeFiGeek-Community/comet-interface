import React, { createContext, useContext } from "react";
import { PriceFeedData } from "../hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "../hooks/pool/shared/useTotalPoolData";
import { PoolConfigMapForList } from "interfaces/pool";

export type Currency = "USD" | "JPY";

export interface AppDataContextType {
  pageName: string;
  setPageName: (name: string) => void;
  chainId: number;
  config: PoolConfigMapForList | undefined;
  priceFeedData: { [poolName: string]: PriceFeedData | undefined };
  updatePriceFeedData: (
    poolName: string,
    data: PriceFeedData | undefined,
  ) => void;
  totalPoolData: { [poolName: string]: TotalPoolData | undefined };
  updateTotalPoolData: (
    poolName: string,
    data: TotalPoolData | undefined,
  ) => void;
  currency: Currency;
  rate?: number;
  toggleCurrency: () => void;
}

export const AppDataContext = createContext<AppDataContextType | undefined>(
  undefined,
);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within a AppDataProvider");
  }
  return context;
};

export default AppDataContext;

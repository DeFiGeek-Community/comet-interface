import React, { createContext, useContext } from "react";
import { PoolConfigMapForList } from "interfaces/pool";
import { TokenRewardData } from "../hooks/pool/shared/useTokenReward";

export type Currency = "USD" | "JPY";

export interface AppSecondaryDataContextType {
  pageName: string;
  setPageName: (name: string) => void;
  chainId: number;
  config: PoolConfigMapForList | undefined;
  tokenRewardData: { [poolName: string]: TokenRewardData | undefined };
  updateTokenRewardData: (
    poolName: string,
    data: TokenRewardData | undefined,
  ) => void;
}

export const AppSecondaryDataContext = createContext<
  AppSecondaryDataContextType | undefined
>(undefined);

export const useAppSecondaryData = () => {
  const context = useContext(AppSecondaryDataContext);
  if (context === undefined) {
    throw new Error(
      "useAppSecondaryData must be used within a AppSecondaryDataProvider",
    );
  }
  return context;
};

export default AppSecondaryDataContext;

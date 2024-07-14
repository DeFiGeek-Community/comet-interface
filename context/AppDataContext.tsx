import React, { createContext, useContext } from "react";
import { PriceFeedData } from "../hooks/pool/shared/usePriceFeed";
import { TotalPoolData } from "../hooks/pool/shared/useTotalPoolData";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TokenRewardData } from "hooks/pool/shared/useTokenReward";
import { PoolConfigMapForList } from "interfaces/pool";
import { PositionSummary } from "hooks/pool/indivisual/usePositionSummary";

export type Currency = "USD" | "JPY";

export interface PoolBaseDataType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
}

export interface AppDataContextType {
  pageName: string;
  setPageName: (name: string) => void;
  chainId: number;
  config: PoolConfigMapForList | undefined;
  priceFeedMapping: { [poolName: string]: PriceFeedData | undefined };
  totalPoolMapping: { [poolName: string]: TotalPoolData | undefined };
  baseAssetMapping: { [poolName: string]: BaseAssetData | undefined };
  collateralAssetMapping: {
    [poolName: string]: CollateralAssetsData | undefined;
  };
  tokenRewardMapping: { [poolName: string]: TokenRewardData | undefined };
  positionSummaryMapping: { [poolName: string]: PositionSummary | undefined };
  updateData: <T>(
    dataType: keyof AppDataContextType,
    poolName: string,
    data: T,
  ) => void;
  baseAssetData: { [poolName: string]: BaseAssetData | undefined };
  updateBaseAssetData: (
    poolName: string,
    data: BaseAssetData | undefined,
  ) => void;
  collateralAssetsData: {
    [poolName: string]: CollateralAssetsData | undefined;
  };
  updateCollateralAssetsData: (
    poolName: string,
    data: CollateralAssetsData | undefined,
  ) => void;
  tokenRewardData: { [poolName: string]: TokenRewardData | undefined };
  updateTokenRewardData: (
    poolName: string,
    data: TokenRewardData | undefined,
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

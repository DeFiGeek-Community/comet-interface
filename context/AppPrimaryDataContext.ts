import { createContext } from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface AppPrimaryDataContextType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
}

const AppPrimaryDataContext = createContext<
AppPrimaryDataContextType | undefined
>(undefined);

export default AppPrimaryDataContext;

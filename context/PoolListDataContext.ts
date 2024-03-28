import { createContext } from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface PoolListDataContextType {
  priceFeedData: { [poolName: string]: PriceFeedData | undefined };
  totalPoolData: { [poolName: string]: TotalPoolData | undefined };
}

const PoolListDataContext = createContext<
  PoolListDataContextType | undefined
>(undefined);

export default PoolListDataContext;

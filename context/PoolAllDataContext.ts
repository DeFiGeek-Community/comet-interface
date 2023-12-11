import { createContext } from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { ClaimReward } from "hooks/pool/indivisual/useClaimReward";

export interface PoolAllDataContextType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
  claimReward: ClaimReward | undefined;
}

const PoolAllDataContext = createContext<PoolAllDataContextType | undefined>(
  undefined,
);

export default PoolAllDataContext;

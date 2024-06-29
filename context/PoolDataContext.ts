import { createContext } from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { TotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { TokenRewardData } from "hooks/pool/shared/useTokenReward";
import { PositionSummary } from "hooks/pool/indivisual/usePositionSummary";

interface PoolDataContextType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
  totalPoolData: TotalPoolData | undefined;
  tokenRewardData: TokenRewardData | undefined;
  positionSummary: PositionSummary | undefined;
}

export const PoolDataContext = createContext<PoolDataContextType | undefined>(
  undefined,
);

export default PoolDataContext;

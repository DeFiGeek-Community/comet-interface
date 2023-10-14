import React from "react";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
import { BaseAssetData } from "hooks/pool/indivisual/useBaseAsset";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";

interface PoolPrimaryDataContextType {
  priceFeedData: PriceFeedData | undefined;
  baseAssetData: BaseAssetData | undefined;
  collateralAssetsData: CollateralAssetsData | undefined;
}

const PoolPrimaryDataContext = React.createContext<
  PoolPrimaryDataContextType | undefined
>(undefined);

export default PoolPrimaryDataContext;

import { createContext } from "react";
import { BaseCollateralAssetAndTotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface PoolAllTotalDataContextType {
  baseCollateralAssetAndTotalPoolData:
    | BaseCollateralAssetAndTotalPoolData[]
    | undefined;
}

const PoolAllTotalDataContext = createContext<
  PoolAllTotalDataContextType | undefined
>(undefined);

export default PoolAllTotalDataContext;

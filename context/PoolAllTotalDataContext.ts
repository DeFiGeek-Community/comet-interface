import { createContext } from "react";
import {
  TotalPoolData,
  TotalPoolDataValue,
  BaseAssetAndTotalPoolData,
  BaseCollateralAssetAndTotalPoolData,
} from "hooks/pool/shared/useTotalPoolData";

export interface PoolAllTotalDataContextType {
  test: TotalPoolDataValue[] | undefined;
  baseAssetAndTotalPoolData: BaseAssetAndTotalPoolData[] | undefined;
  baseCollateralAssetAndTotalPoolData:
    | BaseCollateralAssetAndTotalPoolData[]
    | undefined;
}

const PoolAllTotalDataContext = createContext<
  PoolAllTotalDataContextType | undefined
>(undefined);

export default PoolAllTotalDataContext;

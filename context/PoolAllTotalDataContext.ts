import { createContext } from "react";
import { TotalPoolData, TotalPoolDataValue, BaseAssetAndTotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface PoolAllTotalDataContextType {
  test : TotalPoolDataValue[] | undefined;
  baseAssetAndTotalPoolData : BaseAssetAndTotalPoolData[] | undefined;
}

const PoolAllTotalDataContext = createContext<PoolAllTotalDataContextType | undefined>(
  undefined,
);

export default PoolAllTotalDataContext;

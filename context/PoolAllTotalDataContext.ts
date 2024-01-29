import { createContext } from "react";
import { AllTotalPoolData } from "hooks/pool/shared/useTotalPoolData";

export interface PoolAllTotalDataContextType {
  allPoolData: AllTotalPoolData[] | undefined;
}

const PoolAllTotalDataContext = createContext<
  PoolAllTotalDataContextType | undefined
>(undefined);

export default PoolAllTotalDataContext;

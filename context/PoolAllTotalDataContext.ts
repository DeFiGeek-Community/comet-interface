import { createContext } from "react";
import { AllTotalPoolData } from "hooks/pool/list/useTotalPoolDataTest";

export interface PoolAllTotalDataContextType {
  allTotalPoolData: AllTotalPoolData[] | undefined;
}

const PoolAllTotalDataContext = createContext<
  PoolAllTotalDataContextType | undefined
>(undefined);

export default PoolAllTotalDataContext;

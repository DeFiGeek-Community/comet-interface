import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { AllTotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { POOL_CONFIG_MAP, PoolNames } from "constants/pools";

interface PoolAllTotalDataProviderProps {
  // chainId: number | undefined;
  // allPoolName: PoolNames | undefined;
  children: any;
}

export const PoolAllTotalDataProvider: React.FC<
  PoolAllTotalDataProviderProps
> = ({ children }) => {
  let allPoolData: AllTotalPoolData[] | undefined = [];

  // const { allTotalPoolData, error } = useTotalPoolData(undefined, true);

  // allPoolData = allTotalPoolData;

  return (
    <PoolAllTotalDataContext.Provider
      value={{
        allPoolData,
      }}
    >
      {children}
    </PoolAllTotalDataContext.Provider>
  );
};

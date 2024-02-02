import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolDataTest from "hooks/pool/list/useTotalPoolDataTest";
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
  const { allTotalPoolData, error } = useTotalPoolDataTest();

  // allPoolData = allTotalPoolData;

  return (
    <PoolAllTotalDataContext.Provider
      value={{
        allTotalPoolData,
      }}
    >
      {children}
    </PoolAllTotalDataContext.Provider>
  );
};

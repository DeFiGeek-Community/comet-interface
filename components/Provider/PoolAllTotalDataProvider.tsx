import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useAllTotalPoolData from "hooks/pool/shared/useAllTotalPoolData";
import { BaseCollateralAssetAndTotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { POOL_CONFIG_MAP, PoolNames } from "constants/pools";

interface PoolAllTotalDataProviderProps {
  chainId: number | undefined;
  allPoolName: PoolNames | undefined;
  children: any;
}

export const PoolAllTotalDataProvider: React.FC<
  PoolAllTotalDataProviderProps
> = ({ chainId, allPoolName, children }) => {
  let baseCollateralAssetAndTotalPoolData:
    | BaseCollateralAssetAndTotalPoolData[]
    | undefined = [];
  const { allTotalPoolData, error } = useAllTotalPoolData(chainId, allPoolName);
  baseCollateralAssetAndTotalPoolData = allTotalPoolData;
  // for (let key in allPoolName) {
  //   const temporaryConfig: PoolConfig =
  //     POOL_CONFIG_MAP[chainId ? chainId : 1][key];
  //   const { totalPoolData, error } = useTotalPoolData(temporaryConfig);
  //   let sumCollateralBalances = 0;
  //   for (let key in totalPoolData?.totalCollateralBalances) {
  //     sumCollateralBalances += totalPoolData.totalCollateralBalances[key];
  //   }
  //   baseCollateralAssetAndTotalPoolData.push({
  //     baseToken: temporaryConfig?.baseToken,
  //     assetConfigs: temporaryConfig?.assetConfigs,
  //     totalBaseSupplyBalance: totalPoolData?.totalBaseSupplyBalance,
  //     totalBaseBorrowBalance: totalPoolData?.totalBaseBorrowBalance,
  //     totalCollateralBalances: sumCollateralBalances,
  //   });
  // }

  return (
    <PoolAllTotalDataContext.Provider
      value={{
        baseCollateralAssetAndTotalPoolData,
      }}
    >
      {children}
    </PoolAllTotalDataContext.Provider>
  );
};

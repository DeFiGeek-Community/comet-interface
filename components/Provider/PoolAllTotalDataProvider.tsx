import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { TotalPoolDataValue, BaseAssetAndTotalPoolData } from "hooks/pool/shared/useTotalPoolData";
import { POOL_CONFIG_MAP, PoolNames } from "constants/pools";

interface PoolAllTotalDataProviderProps {
  chainId: number | undefined;
  allPoolName: PoolNames | undefined;
  children: any;
}

export const PoolAllTotalDataProvider: React.FC<
PoolAllTotalDataProviderProps
> = ({ chainId, allPoolName, children }) => {
  let test : TotalPoolDataValue[] = [];
  let baseAssetAndTotalPoolData: BaseAssetAndTotalPoolData[] = [];
  for (let key in allPoolName) {
    const tempolaryConfig: PoolConfig = POOL_CONFIG_MAP[chainId?chainId:0][key];
    const { totalPoolData, error } = useTotalPoolData(tempolaryConfig);
    let sumCollateralBalances = 0;
    for (let key in totalPoolData?.totalCollateralBalances) {
      sumCollateralBalances += totalPoolData.totalCollateralBalances[key];
    }
    test.push({
      totalBaseSupplyBalance: totalPoolData?.totalBaseSupplyBalance,
      totalBaseBorrowBalance: totalPoolData?.totalBaseBorrowBalance,
      totalCollateralBalances: sumCollateralBalances,
    });
    baseAssetAndTotalPoolData.push({
      baseAssetName: tempolaryConfig?.baseToken.name,
      totalPoolData: {
        totalBaseSupplyBalance: totalPoolData?.totalBaseSupplyBalance,
        totalBaseBorrowBalance: totalPoolData?.totalBaseBorrowBalance,
        totalCollateralBalances: sumCollateralBalances,
      },
    });
  }

  return (
    <PoolAllTotalDataContext.Provider
      value={{
        test,
        baseAssetAndTotalPoolData,
      }}
    >
      {children}
    </PoolAllTotalDataContext.Provider>
  );
};

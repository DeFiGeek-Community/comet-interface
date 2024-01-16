import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig, BaseAsset, CollateralAsset } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import {
  fetchTotalDataComet,
  fetchTotalCollateralDataComet,
} from "hooks/util/cometContractUtils";
import { POOL_CONFIG_MAP, PoolNames } from "constants/pools";

export interface TotalCollateralData {
  [key: string]: number | 0;
}
export interface TotalPoolData {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: TotalCollateralData;
}

export interface BaseCollateralAssetAndTotalPoolData {
  baseToken: BaseAsset;
  assetConfigs: CollateralAsset[];
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: number | undefined;
}

const useAllTotalPoolData = (
  chainId: number | undefined,
  allPoolName: PoolNames | undefined,
) => {
  const [allTotalPoolData, setAllTotalPoolData] = useState<
    BaseCollateralAssetAndTotalPoolData[] | undefined
  >([]);
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchAllPoolMetricsData = useCallback(async () => {
    let tempBaseCollateralAssetAndTotalPoolData: BaseCollateralAssetAndTotalPoolData[] =
      [];
    try {
      for (let key in allPoolName) {
        const temporaryConfig: PoolConfig =
          POOL_CONFIG_MAP[chainId ? chainId : 1][key];
        if (!temporaryConfig) {
          setAllTotalPoolData(undefined);
          return;
        }

        const getTotalSupply = await fetchTotalDataComet(
          "totalSupply",
          temporaryConfig,
        );
        const getTotalBorrow = await fetchTotalDataComet(
          "totalBorrow",
          temporaryConfig,
        );
        const totalCollateralBalances: { [key: string]: number | 0 } = {};
        for (const assetConfig of temporaryConfig.assetConfigs) {
          const getTotalsCollateral = await fetchTotalCollateralDataComet(
            "totalsCollateral",
            temporaryConfig,
            assetConfig.address,
          );
          totalCollateralBalances[assetConfig.symbol] =
            getTotalsCollateral !== undefined
              ? Number(formatUnits(getTotalsCollateral, assetConfig.decimals))
              : 0;
        }
        const fetchedData: TotalPoolData = {
          totalBaseSupplyBalance:
            getTotalSupply !== undefined
              ? Number(
                  formatUnits(getTotalSupply, temporaryConfig.cometDecimals),
                )
              : undefined,
          totalBaseBorrowBalance:
            getTotalBorrow !== undefined
              ? Number(
                  formatUnits(getTotalBorrow, temporaryConfig.cometDecimals),
                )
              : undefined,
          totalCollateralBalances: totalCollateralBalances,
        };
        let sumCollateralBalances = 0;
        for (let key in fetchedData?.totalCollateralBalances) {
          sumCollateralBalances += fetchedData.totalCollateralBalances[key];
        }
        tempBaseCollateralAssetAndTotalPoolData.push({
          baseToken: temporaryConfig?.baseToken,
          assetConfigs: temporaryConfig?.assetConfigs,
          totalBaseSupplyBalance: fetchedData?.totalBaseSupplyBalance,
          totalBaseBorrowBalance: fetchedData?.totalBaseBorrowBalance,
          totalCollateralBalances: sumCollateralBalances,
        });
      }
      setAllTotalPoolData(tempBaseCollateralAssetAndTotalPoolData);
    } catch (err) {
      console.log("usePoolMetrics", err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    }
  }, [chainId, allPoolName, reloadKey]);

  useEffect(() => {
    fetchAllPoolMetricsData();
  }, [fetchAllPoolMetricsData]);

  return { allTotalPoolData, error };
};

export default useAllTotalPoolData;

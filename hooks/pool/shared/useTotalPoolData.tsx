import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig, BaseAsset, CollateralAsset } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import {
  fetchTotalDataComet,
  fetchTotalCollateralDataComet,
} from "hooks/util/cometContractUtils";
import { useNetwork } from "wagmi";
import { POOL_CONFIG_MAP } from "constants/pools";

export interface TotalCollateralData {
  [key: string]: number | 0;
}
export interface TotalPoolData {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: TotalCollateralData;
}

export interface AllTotalPoolData {
  [key: string]: {
    totalBaseSupplyBalance: number | undefined;
    totalBaseBorrowBalance: number | undefined;
    totalCollateralBalances: TotalCollateralData;
  };
}

const useTotalPoolData = (
  poolData?: PoolConfig | undefined,
  isAllData?: boolean,
) => {
  const [totalPoolData, setTotalPoolData] = useState<
    TotalPoolData | undefined
  >();
  const [error, setError] = useState<Error | null>(null);
  const [allTotalPoolData, setAllTotalPoolData] = useState<
    AllTotalPoolData[] | undefined
  >([]);
  const { chain } = useNetwork();
  const { reloadKey } = useReload();

  const fetchPoolMetricsData = useCallback(async () => {
    if (!isAllData) {
      if (!poolData) {
        setTotalPoolData(undefined);
        return;
      }

      try {
        const getTotalSupply = await fetchTotalDataComet(
          "totalSupply",
          poolData,
        );
        const getTotalBorrow = await fetchTotalDataComet(
          "totalBorrow",
          poolData,
        );
        const totalCollateralBalances: { [key: string]: number | 0 } = {};
        for (const assetConfig of poolData.assetConfigs) {
          const getTotalsCollateral = await fetchTotalCollateralDataComet(
            "totalsCollateral",
            poolData,
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
              ? Number(formatUnits(getTotalSupply, poolData.cometDecimals))
              : undefined,
          totalBaseBorrowBalance:
            getTotalBorrow !== undefined
              ? Number(formatUnits(getTotalBorrow, poolData.cometDecimals))
              : undefined,
          totalCollateralBalances: totalCollateralBalances,
        };

        setTotalPoolData(fetchedData);
      } catch (err) {
        console.log("usePoolMetrics", err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    } else {
      console.log("OK!");
      let tempAllTotalPoolData: AllTotalPoolData[] | undefined = [];
      if (chain) {
        for (let str in POOL_CONFIG_MAP[chain.id]) {
          const temporaryConfig = POOL_CONFIG_MAP[chain.id][str];
          try {
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
                  ? Number(
                      formatUnits(getTotalsCollateral, assetConfig.decimals),
                    )
                  : 0;
            }

            const fetchedData: TotalPoolData = {
              totalBaseSupplyBalance:
                getTotalSupply !== undefined
                  ? Number(
                      formatUnits(
                        getTotalSupply,
                        temporaryConfig.cometDecimals,
                      ),
                    )
                  : undefined,
              totalBaseBorrowBalance:
                getTotalBorrow !== undefined
                  ? Number(
                      formatUnits(
                        getTotalBorrow,
                        temporaryConfig.cometDecimals,
                      ),
                    )
                  : undefined,
              totalCollateralBalances: totalCollateralBalances,
            };
            tempAllTotalPoolData.push({
              [str]: fetchedData,
            });
          } catch (err) {
            console.log("usePoolMetrics", err);
            if (err instanceof Error) {
              setError(err);
            } else {
              setError(new Error(String(err)));
            }
          }
        }
        setAllTotalPoolData(tempAllTotalPoolData);
      }
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
    }
  }, [poolData, chain, reloadKey]);

  useEffect(() => {
    fetchPoolMetricsData();
  }, [fetchPoolMetricsData]);

  return { totalPoolData, allTotalPoolData, error };
};

export default useTotalPoolData;

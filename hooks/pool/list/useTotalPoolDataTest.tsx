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

const useTotalPoolDataTest = () => {
  const [allTotalPoolData, setAllTotalPoolData] = useState<
    AllTotalPoolData[] | undefined
  >([]);
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const { chain } = useNetwork();

  const fetchPoolMetricsData = useCallback(async () => {
    let tempAllTotalPoolData: AllTotalPoolData[] | undefined = [];
    if (chain) {
      console.log("start!");
      let now = new Date();
      let Hour = now.getHours();
      let Min = now.getMinutes();
      let Sec = now.getSeconds();
      console.log(Hour + ":" + Min + ":" + Sec);
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
      console.log("Goal!");
      now = new Date();
      Hour = now.getHours();
      Min = now.getMinutes();
      Sec = now.getSeconds();
      console.log(Hour + ":" + Min + ":" + Sec);
    }
  }, [chain, reloadKey]);

  useEffect(() => {
    fetchPoolMetricsData();
  }, [fetchPoolMetricsData]);

  return { allTotalPoolData, error };
};

export default useTotalPoolDataTest;

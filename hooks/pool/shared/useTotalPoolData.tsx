import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig, BaseAsset, CollateralAsset } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import {
  fetchTotalDataComet,
  fetchTotalCollateralDataComet,
} from "hooks/util/cometContractUtils";

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

const useTotalPoolData = (poolData?: PoolConfig | undefined) => {
  const [totalPoolData, setTotalPoolData] = useState<
    TotalPoolData | undefined
  >();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchPoolMetricsData = useCallback(async () => {
    if (!poolData) {
      setTotalPoolData(undefined);
      return;
    }

    try {
      const getTotalSupply = await fetchTotalDataComet("totalSupply", poolData);
      const getTotalBorrow = await fetchTotalDataComet("totalBorrow", poolData);
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
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchPoolMetricsData();
  }, [fetchPoolMetricsData]);

  return { totalPoolData, error };
};

export default useTotalPoolData;

import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import { fetchTotalDataComet, fetchTotalCollateralDataComet } from "hooks/util/cometContractUtils";

type TotalPoolData = {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: {
    [key: string]: number | undefined;
  };
};

const usePoolMetrics = (poolData: PoolConfig | undefined) => {
  const [poolMetrics, setPoolMetrics] = useState<TotalPoolData | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchPoolMetricsData = useCallback(async () => {
    if (!poolData) {
      setPoolMetrics(undefined);
      return;
    }

    try {
      const getTotalSupply  = await fetchTotalDataComet("totalSupply", poolData);
      const getTotalBorrow = await fetchTotalDataComet("totalBorrow", poolData);
      const totalCollateralBalances: { [key: string]: number | undefined } = {};
      for (const assetConfig of poolData.assetConfigs) {
        const getTotalsCollateral = await fetchTotalCollateralDataComet("totalsCollateral", poolData, assetConfig.address);
        totalCollateralBalances[assetConfig.symbol] = getTotalsCollateral !== undefined
        ? Number(formatUnits(getTotalsCollateral, assetConfig.decimals))
        : undefined;
      }

      // ダミーデータを使用
      const fetchedData: TotalPoolData = {
        totalBaseSupplyBalance: getTotalSupply !== undefined
        ? Number(formatUnits(getTotalSupply, poolData.cometDecimals))
        : undefined,
        totalBaseBorrowBalance: getTotalBorrow !== undefined
        ? Number(formatUnits(getTotalBorrow, poolData.cometDecimals))
        : undefined,
        totalCollateralBalances: totalCollateralBalances,
      };

      setPoolMetrics(fetchedData);
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

  return { poolMetrics, error };
};

export default usePoolMetrics;

import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import {
  fetchTotalDataComet,
  fetchTotalCollateralDataComet,
} from "hooks/util/cometContractUtils";

export interface TotalCollateralData {
  [key: string]: number | undefined;
}
export interface TotalPoolData {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: TotalCollateralData;
  a: bigint | undefined;
}

const useTotalPoolData = (poolData: PoolConfig | undefined) => {
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
      const totalCollateralBalances: { [key: string]: number | undefined } = {};
      let tCB: bigint[] = [];
      let ind: any = 0;
      for (const assetConfig of poolData.assetConfigs) {
        const getTotalsCollateral = await fetchTotalCollateralDataComet(
          "totalsCollateral",
          poolData,
          assetConfig.address,
        );
        totalCollateralBalances[assetConfig.symbol] =
          getTotalsCollateral !== undefined
            ? Number(formatUnits(getTotalsCollateral, assetConfig.decimals))
            : undefined;
        tCB[ind] =
          getTotalsCollateral !== undefined ? getTotalsCollateral : BigInt(0);
        ind++;
      }
      let a: bigint = BigInt(0);
      a = tCB[0] + tCB[1] + tCB[2] + tCB[3];

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
        a: a,
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

import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

type TotalPoolData = {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalance: number | undefined;
  availableLiquidity: number | undefined;
};

const usePoolMetrics = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const poolMetrics = useMemo<TotalPoolData | undefined>(() => {
    if (!poolData) {
      return undefined;
    }

    let fetchedData: TotalPoolData | undefined;

    const fetchPoolMetricsData = async () => {
      try {
        // ここでデータを取得するロジックを書く
        // const totalBaseSupplyBalance = comet.totalSupply();
        // const totalBaseBorrowBalance = comet.totalBorrow();
        // const totalCollateralBalance = CollateralBalance_TXJP + CollateralBalance_wstETH + CollateralBalance_USDC + CollateralBalance_crvUSD;
        // const CollateralBalance_TXJP = comet.totalsCollateral[address_TXJP];
        // const CollateralBalance_wstETH = comet.totalsCollateral[address_wstETH];
        // const CollateralBalance_USDC = comet.totalsCollateral[address_USDC];
        // const CollateralBalance_crvUSD = comet.totalsCollateral[address_crvUSD];
        // const availableLiquidity = ?;

        // ダミーデータを使用
        fetchedData = {
          totalBaseSupplyBalance: 10000,
          totalBaseBorrowBalance: 500,
          totalCollateralBalance: 7500,
          availableLiquidity: 2500,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchPoolMetricsData();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { poolMetrics, error, reload };
};

export default usePoolMetrics;

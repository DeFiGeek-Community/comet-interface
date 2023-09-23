import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

type TotalPoolData = {
  totalBaseSupplyBalance: any;
  totalBaseBorrowBalance: any;
  totalCollateralBalance: any;
  availableLiquidity: any;
};

const usePoolMetrics = (poolData?: PoolConfig) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const poolMetrics = useMemo<TotalPoolData | undefined>(() => {
    let fetchedData: TotalPoolData | undefined;

    const fetchPoolData = async () => {
      try {
        // ここでデータを取得するロジックを書く

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

    fetchPoolData();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { poolMetrics, error, reload };
};

export default usePoolMetrics;

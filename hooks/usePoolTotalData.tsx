import { useState, useEffect, useMemo } from 'react';

type PoolTotalDataResponse = {
  totalBaseSupplyBalance: any;
  totalBaseBorrowBalance: any;
  totalCollateralBalance: any;
  availableLiquidity: any;
};

const usePoolTotalData = (poolAddress?: string) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

const poolData = useMemo<PoolTotalDataResponse | undefined>(() => {
    let fetchedData: PoolTotalDataResponse | undefined;

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
  }, [poolAddress, reloadKey]);


  const reload = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  return { poolData, error, reload };
};

export default usePoolTotalData;

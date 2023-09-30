import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface BasePoolData {
  supplyAPR: number;
  yourSupply: number;
  borrowAPR: number;
  yourBorrow: number;
  availableToBorrow: number;
}

const useBasePoolData = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const basePoolData = useMemo<BasePoolData | undefined>(() => {
    if (!poolData) {
      return undefined;
    }

    let fetchedData: BasePoolData | undefined;

    const fetchBasePoolData = async () => {
      try {
        // const availableToBorrow = getAvailableToBorrow();

        // ダミーデータを使用
        fetchedData = {
          supplyAPR: 5.0,
          yourSupply: 100,
          borrowAPR: 10.0,
          yourBorrow: 50,
          availableToBorrow: 120,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchBasePoolData();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { basePoolData, error, reload };
};

export default useBasePoolData;

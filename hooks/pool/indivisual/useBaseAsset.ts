import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface baseAssetData {
  supplyAPR: number | undefined;
  yourSupply: number | undefined;
  borrowAPR: number | undefined;
  yourBorrow: number | undefined;
  availableToBorrow: number | undefined;
}

const useBaseAssetData = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const baseAssetData = useMemo<baseAssetData | undefined>(() => {
    if (!poolData) {
      return undefined;
    }

    let fetchedData: baseAssetData | undefined;

    const fetchBaseAsset = async () => {
      try {
        // const availableToBorrow = getAvailableToBorrow();

        // ダミーデータを使用
        fetchedData = {
          supplyAPR: 0,
          yourSupply: 0,
          borrowAPR: 0,
          yourBorrow: 0,
          availableToBorrow: 0,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchBaseAsset();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { baseAssetData, error, reload };
};

export default useBaseAssetData;

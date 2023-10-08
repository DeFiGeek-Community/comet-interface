import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface baseAssetData {
  supplyAPR: number;
  yourSupply: number;
  borrowAPR: number;
  yourBorrow: number;
  availableToBorrow: number;
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
        // fetchedData = {
        //   supplyAPR: 5.0,
        //   yourSupply: 0,
        //   borrowAPR: 10.0,
        //   yourBorrow: 504000,
        //   availableToBorrow: 7000,
        // };
        fetchedData = {
          supplyAPR: 5.0,
          yourSupply: 504000,
          borrowAPR: 10.0,
          yourBorrow: 0,
          availableToBorrow: 120000,
        };
        // fetchedData = {
        //   supplyAPR: 5.0,
        //   yourSupply: 0,
        //   borrowAPR: 10.0,
        //   yourBorrow: 0,
        //   availableToBorrow: 120000,
        // };
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

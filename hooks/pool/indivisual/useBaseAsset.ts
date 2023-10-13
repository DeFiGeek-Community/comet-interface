import { useState, useEffect } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";


interface BaseAssetData {
  supplyAPR: number | undefined;
  yourSupply: number | undefined;
  borrowAPR: number | undefined;
  yourBorrow: number | undefined;
  availableToBorrow: number | undefined;
}

export const fetchSupplyAPR = async () => undefined;

export const fetchYourSupply = async () => fetchDataFromComet("balanceOf");

export const fetchBorrowAPR = async () => undefined;

export const fetchYourBorrow = async () =>
  fetchDataFromComet("borrowBalanceOf");

export const fetchAvailableToBorrow = async () => undefined;

const useBaseAssetData = (poolData: PoolConfig | undefined) => {
  const [baseAssetData, setBaseAssetData] = useState<BaseAssetData>();
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchBaseAsset = async () => {
      try {
        const [
          supplyAPR,
          yourSupply,
          borrowAPR,
          yourBorrow,
          availableToBorrow,
        ] = await Promise.all([
          fetchSupplyAPR(),
          fetchYourSupply(),
          fetchBorrowAPR(),
          fetchYourBorrow(),
          fetchAvailableToBorrow(),
        ]);

        setBaseAssetData({
          supplyAPR,
          yourSupply,
          borrowAPR,
          yourBorrow,
          availableToBorrow,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    fetchBaseAsset();
  }, [poolData, reloadKey]);

  const reload = () => setReloadKey((prevKey) => prevKey + 1);

  return { baseAssetData, error, reload };
};

export default useBaseAssetData;

import { useState, useEffect, useCallback } from "react";
import { formatEther } from "viem";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet, fetchTotalDataComet, fetchRateDataComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

export interface BaseAssetData {
  supplyAPR: number | undefined;
  yourSupply: bigint | undefined;
  borrowAPR: number | undefined;
  yourBorrow: bigint | undefined;
  availableToBorrow: bigint | undefined;
}

const useBaseAsset = (poolData: PoolConfig | undefined) => {
  const [baseAssetData, setBaseAssetData] = useState<BaseAssetData>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchBaseAsset = useCallback(async () => {
    if (!poolData) {
      setBaseAssetData(undefined);
      return;
    }
    const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
    try {
      const utilization = await fetchTotalDataComet("getUtilization" ,poolData);

      const [supplyRate, yourSupply, borrowRate, yourBorrow] =
        await Promise.all([
          fetchRateDataComet("getSupplyRate", poolData, utilization),
          fetchDataFromComet("balanceOf", poolData),
          fetchRateDataComet("getBorrowRate", poolData, utilization),
          fetchDataFromComet("borrowBalanceOf", poolData),
        ]);
        const borrowAPR = borrowRate ? Number(formatEther(borrowRate)) * SECONDS_PER_YEAR : undefined;
        const supplyAPR = supplyRate ? Number(formatEther(supplyRate)) * SECONDS_PER_YEAR : undefined;
        console.log("useBaseAsset", supplyAPR, borrowAPR);
        setBaseAssetData({
        supplyAPR: supplyAPR,
        yourSupply: yourSupply !== undefined ? yourSupply : undefined,
        borrowAPR : borrowAPR,
        yourBorrow: yourBorrow !== undefined ? yourBorrow : undefined,
        availableToBorrow: undefined,
      });
    } catch (err) {
      console.log("useBaseAsset", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchBaseAsset();
  }, [fetchBaseAsset]);

  return { baseAssetData, error };
};

export default useBaseAsset;

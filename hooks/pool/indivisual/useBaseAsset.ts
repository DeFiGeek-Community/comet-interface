import { useState, useEffect, useCallback, useRef } from "react";
import { formatEther } from "viem";
import { PoolConfig } from "interfaces/pool";
import {
  fetchDataFromComet,
  fetchTotalDataComet,
  fetchRateDataComet,
} from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";
import { useAppData } from "context/AppDataContext";

export interface BaseAssetData {
  supplyAPR: number | undefined;
  yourSupply: bigint | undefined;
  borrowAPR: number | undefined;
  yourBorrow: bigint | undefined;
}

const useBaseAsset = (poolData: PoolConfig | undefined) => {
  const [baseAssetData, setBaseAssetData] = useState<BaseAssetData>();
  const [error, setError] = useState<Error | null>(null);

  const { baseAssetMapping } = useAppData();

  const { reloadKey } = useReload();
  const prevReloadKey = useRef(reloadKey);

  const fetchBaseAsset = useCallback(async () => {
    if (!poolData) {
      setBaseAssetData(undefined);
      return;
    }

    // 共通データが存在する場合は、そのデータを使用
    const sharedData = baseAssetMapping[poolData.baseToken.symbol];
    if (sharedData && prevReloadKey.current === reloadKey) {
      setBaseAssetData(sharedData);
      return;
    }

    prevReloadKey.current = reloadKey;
    const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
    console.log("useBaseAsset");
    try {
      const utilization = await fetchTotalDataComet("getUtilization", poolData);

      const [supplyRate, yourSupply, borrowRate, yourBorrow] =
        await Promise.all([
          fetchRateDataComet("getSupplyRate", poolData, utilization),
          fetchDataFromComet("balanceOf", poolData),
          fetchRateDataComet("getBorrowRate", poolData, utilization),
          fetchDataFromComet("borrowBalanceOf", poolData),
        ]);
      const borrowAPR = borrowRate
        ? Number(formatEther(borrowRate)) * SECONDS_PER_YEAR
        : 0;
      const supplyAPR = supplyRate
        ? Number(formatEther(supplyRate)) * SECONDS_PER_YEAR
        : 0;
      setBaseAssetData({
        supplyAPR: supplyAPR,
        yourSupply: yourSupply !== undefined ? yourSupply : undefined,
        borrowAPR: borrowAPR,
        yourBorrow: yourBorrow !== undefined ? yourBorrow : undefined,
      });
    } catch (err) {
      console.log("useBaseAsset", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, reloadKey]);

  useEffect(() => {
    setBaseAssetData(undefined);
    fetchBaseAsset();
  }, [fetchBaseAsset]);

  return { baseAssetData, error };
};

export default useBaseAsset;

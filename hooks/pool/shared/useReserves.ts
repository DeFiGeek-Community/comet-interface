import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchTotalDataComet } from "hooks/util/cometContractUtils";
import { formatUnits } from "viem";

export interface ReservesData {
  totalReserves: bigint | undefined;
  formattedReserves: string | undefined;
}

const useReserves = (poolData: PoolConfig | undefined) => {
  const [reservesData, setReservesData] = useState<ReservesData>();
  const [error, setError] = useState<Error | null>(null);

  const fetchReservesData = useCallback(async () => {
    if (!poolData) {
      setReservesData(undefined);
      return;
    }

    try {
      const reserves = await fetchTotalDataComet(
        "getReserves",
        poolData
      );

      const formattedReserves = reserves
        ? Number(formatUnits(reserves, poolData.baseToken.decimals)).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
        : undefined;

      setReservesData({
        totalReserves: reserves,
        formattedReserves
      });
    } catch (err) {
      console.log("useReserves error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData]);

  useEffect(() => {
    fetchReservesData();
  }, [fetchReservesData]);

  return { 
    reservesData, 
    error,
    isLoading: !reservesData && !error,
    reload: fetchReservesData
  };
};

export default useReserves;
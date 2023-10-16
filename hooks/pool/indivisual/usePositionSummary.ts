import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { useReload } from "context/ReloadContext";

interface PositionSummary {
  collateralBalance: number | undefined;
  LiquidationPoint: number | undefined;
  BorrowCapacity: number | undefined;
  LiquidationPercentage: number | undefined;
}

const usePositionSummary = (poolData: PoolConfig | undefined) => {
  const [positionSummary, setPositionSummary] = useState<PositionSummary>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchPositionSummary = useCallback(async () => {
    if (!poolData) {
      setPositionSummary(undefined);
      return;
    }

    try {
      // ここでデータを取得するロジックを書く

      // ダミーデータを使用
      const fetchedData: PositionSummary = {
        collateralBalance: undefined,
        LiquidationPoint: undefined,
        BorrowCapacity: undefined,
        LiquidationPercentage: undefined,
      };

      setPositionSummary(fetchedData);
    } catch (err) {
      console.log("usePositionSummary", err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    }
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchPositionSummary();
  }, [fetchPositionSummary]);

  return { positionSummary, error };
};

export default usePositionSummary;

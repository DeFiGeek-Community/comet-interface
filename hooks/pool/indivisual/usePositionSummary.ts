import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface PositionSummary {
  collateralBalance: number;
  LiquidationPoint: number;
  BorrowCapacity: number;
  LiquidationPercentage: number;
}

const usePositionSummary = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const positionSummary = useMemo<PositionSummary | undefined>(() => {
    let fetchedData: PositionSummary | undefined;

    const fetchPositionSummary = async () => {
      try {
        // ここでデータを取得するロジックを書く

        // ダミーデータを使用
        fetchedData = {
          collateralBalance: 180,
          LiquidationPoint: 160,
          BorrowCapacity: 150,
          LiquidationPercentage: 30,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchPositionSummary();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { positionSummary, error, reload };
};

export default usePositionSummary;

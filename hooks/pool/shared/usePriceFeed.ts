import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface PriceFeedData {
  usdjpy: number;
  baseAsset: number;
  collateralAssets: number[];
  rewardAsset: number;
}

const usePriceFeedData = ( poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const priceFeedData = useMemo<PriceFeedData | undefined>(() => {
    let fetchedData: PriceFeedData | undefined;

    const fetchPriceFeedData = async () => {
      try {
        // ここでデータを取得するロジックを書く

        // ダミーデータを使用
        fetchedData = {
          usdjpy: 140,
          baseAsset: 0.01,
          collateralAssets: [0.04, 2000],
          rewardAsset: 1,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchPriceFeedData();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { priceFeedData, error, reload };
};

export default usePriceFeedData;

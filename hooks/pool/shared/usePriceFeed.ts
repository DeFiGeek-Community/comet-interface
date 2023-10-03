import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface PriceFeedData {
  usdjpy: number;
  baseAsset: number;
  collateralAssets: {
    [key: string]: number;
  };
  rewardAsset: number;
}

const usePriceFeedData = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const priceFeedData = useMemo<PriceFeedData | undefined>(() => {
    let fetchedData: PriceFeedData | undefined;

    const fetchPriceFeedData = async () => {
      try {
        // ここでデータを取得するロジックを書く
        // const jpyusd = comet.getPrice(jpyusdPriceFeed);
        // const usdjpy = jpyusd != 0 ? 1 / jpyusd : undefined;

        // const baseAsset = comet.getPrice(baseTokenPriceFeed);
        // const TXJP = comet.getPrice(TXJPPriceFeed);
        // const wstETH = WstETHPriceFeed.latestRoundData();
        // const rewardAsset = comet.getPrice(rewardAssetPriceFeed);

        // ダミーデータを使用
        fetchedData = {
          usdjpy: 140,
          baseAsset: 0.0067,
          collateralAssets: {
            TXJP: 52.44,
            wstETH: 1732,
          },
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

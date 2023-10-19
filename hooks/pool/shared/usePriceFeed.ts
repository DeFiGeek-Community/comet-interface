import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchPriceFeed } from "hooks/util/priceFeedUtils";
import { formatUnits } from "viem";
import { useReload } from "context/ReloadContext";

export interface PriceFeedData {
  usdjpy: number | undefined;
  baseAsset: number | undefined;
  collateralAssets: {
    [key: string]: number | undefined;
  };
  rewardAsset: number | undefined;
}

const usePriceFeedData = (poolData: PoolConfig | undefined) => {
  const [priceFeedData, setPriceFeedData] = useState<PriceFeedData>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchPriceFeedData = useCallback(async () => {
    if (!poolData) {
      setPriceFeedData(undefined);
      return;
    }

    try {
      const jpyPrice = await fetchPriceFeed(poolData.jpyPriceFeed);
      const usdjpy = jpyPrice
        ? Number(formatUnits(jpyPrice, poolData.jpyPriceFeedDecimals))
        : undefined;
      const basePrice = await fetchPriceFeed(poolData.baseToken.priceFeed);
      const baseAsset = basePrice
        ? Number(formatUnits(basePrice, poolData.baseToken.priceFeedDecimals))
        : undefined;
      const rewardPrice = await fetchPriceFeed(poolData.rewardToken.priceFeed);
      // const rewardAsset = rewardPrice
      //   ? Number(
      //       formatUnits(rewardPrice, poolData.rewardToken.priceFeedDecimals),
      //     )
      //   : undefined;
      const rewardAsset = 1;
      const collateralAssets: { [key: string]: number | undefined } = {};
      for (const assetConfig of poolData.assetConfigs) {
        const assetPrice = await fetchPriceFeed(assetConfig.priceFeed);
        collateralAssets[assetConfig.symbol] = assetPrice
          ? Number(formatUnits(assetPrice, assetConfig.priceFeedDecimals))
          : undefined;
      }

      setPriceFeedData({
        usdjpy,
        baseAsset,
        collateralAssets,
        rewardAsset,
      });
    } catch (err) {
      console.log("usePriceFeedData", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchPriceFeedData();
  }, [fetchPriceFeedData]);

  return { priceFeedData, error };
};

export default usePriceFeedData;

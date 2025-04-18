import { useState, useEffect, useCallback, useRef } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchPriceFeed } from "hooks/util/priceFeedUtils";
import { formatUnits } from "viem";
import { useReload } from "context/ReloadContext";
import { useAppData } from "context/AppDataContext";
import { AddressZero } from "constants/chains";

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

  const { priceFeedMapping } = useAppData();

  const { reloadKey } = useReload();
  const prevReloadKey = useRef(reloadKey);

  const fetchPriceFeedData = useCallback(async () => {
    if (!poolData) {
      setPriceFeedData(undefined);
      return;
    }

    // 共通データが存在する場合は、そのデータを使用
    const sharedData = priceFeedMapping[poolData.baseToken.symbol];
    if (sharedData && prevReloadKey.current === reloadKey) {
      setPriceFeedData(sharedData);
      return;
    }
    prevReloadKey.current = reloadKey;

    try {
      console.log("usePriceFeedData");

      const jpyPrice = await fetchPriceFeed(
        poolData.jpyPriceFeed,
        poolData.chainId,
      );
      const usdjpy = jpyPrice
        ? Number(formatUnits(jpyPrice, poolData.jpyPriceFeedDecimals))
        : undefined;
      const basePrice = await fetchPriceFeed(
        poolData.baseToken.priceFeed,
        poolData.chainId,
      );
      const baseAsset = basePrice
        ? Number(formatUnits(basePrice, poolData.baseToken.priceFeedDecimals))
        : undefined;
      const rewardPrice = await fetchPriceFeed(
        poolData.rewardToken.priceFeed,
        poolData.chainId,
      );
      const rewardAsset = rewardPrice
        ? Number(
            formatUnits(rewardPrice, poolData.rewardToken.priceFeedDecimals),
          )
        : undefined;
      const collateralAssets: { [key: string]: number | undefined } = {};
      for (const assetConfig of poolData.assetConfigs) {
        if (assetConfig.priceFeed === AddressZero) {
          collateralAssets[assetConfig.symbol] = 0;
        } else {
          const assetPrice = await fetchPriceFeed(
            assetConfig.priceFeed,
            poolData.chainId,
          );
          collateralAssets[assetConfig.symbol] = assetPrice
            ? Number(formatUnits(assetPrice, assetConfig.priceFeedDecimals))
            : undefined;
        }
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
    setPriceFeedData(undefined);
    fetchPriceFeedData();
  }, [fetchPriceFeedData]);

  return { priceFeedData, error };
};

export default usePriceFeedData;

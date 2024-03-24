import { useState, useEffect, useCallback } from "react";
import { useReload } from "context/ReloadContext";
import { PoolPrimaryDataContextType } from "context/PoolPrimaryDataContext";
import { PoolConfig } from "interfaces/pool";
import { fetchTotalDataComet } from "hooks/util/cometContractUtils";

export interface TokenRewardData {
  supplyRewardAPR: number | undefined;
  borrowRewardAPR: number | undefined;
}

const useTokenRewardData = (
  poolData: PoolConfig | undefined,
  primaryData: PoolPrimaryDataContextType | undefined,
) => {
  const [tokenRewardData, setTokenRewardData] = useState<TokenRewardData>();
  const [error, setError] = useState<Error | null>(null);
  const { reloadKey } = useReload();

  const SECONDS_PER_DAY = 60 * 60 * 24;
  const DAYS_IN_YEAR = 365;
  const BASE_INDEX_SCALE = 1e15;

  // Helper function to calculate APR
  const calculateAPR = (
    assetPrice: number,
    total: number,
    trackingSpeed: number,
    baseAssetPrice: number,
  ) => {
    if (!total) return 0;
    if (!trackingSpeed) return 0;

    const perDay = (trackingSpeed / BASE_INDEX_SCALE) * SECONDS_PER_DAY;
    return (
      ((assetPrice * perDay) / (total * baseAssetPrice)) * DAYS_IN_YEAR * 100
    );
  };

  const fetchTrackingSpeed = async (
    type: "baseTrackingSupplySpeed" | "baseTrackingBorrowSpeed",
    poolData: PoolConfig,
  ) => {
    const speed = await fetchTotalDataComet(type, poolData);
    return Number(speed) ?? 0;
  };

  const fetchTokenRewardData = useCallback(async () => {
    if (!poolData || !primaryData) {
      setTokenRewardData(undefined);
      return;
    }

    try {
      const { baseAssetData, priceFeedData, totalPoolData } = primaryData;
      if (!baseAssetData || !priceFeedData || !totalPoolData) {
        setTokenRewardData(undefined);
        return;
      }
      const totalBaseSupply = totalPoolData?.totalBaseSupplyBalance ?? 0;
      const totalBaseBorrow = totalPoolData?.totalBaseBorrowBalance ?? 0;

      const totalSupply =
        totalBaseSupply >= poolData?.baseMinForRewards ? totalBaseSupply : 0;
      const totalBorrow =
        totalBaseBorrow >= poolData?.baseMinForRewards ? totalBaseBorrow : 0;

      const baseAssetPrice = priceFeedData?.baseAsset ?? 0;
      const rewardAssetPrice = priceFeedData?.rewardAsset ?? 0;

      const baseTrackingSupplySpeed = await fetchTrackingSpeed(
        "baseTrackingSupplySpeed",
        poolData,
      );
      const baseTrackingBorrowSpeed = await fetchTrackingSpeed(
        "baseTrackingBorrowSpeed",
        poolData,
      );

      const supplyCompRewardApr = calculateAPR(
        rewardAssetPrice,
        totalSupply,
        baseTrackingSupplySpeed,
        baseAssetPrice,
      );
      const borrowCompRewardApr = calculateAPR(
        rewardAssetPrice,
        totalBorrow,
        baseTrackingBorrowSpeed,
        baseAssetPrice,
      );

      const fetchedData: TokenRewardData = {
        supplyRewardAPR: supplyCompRewardApr,
        borrowRewardAPR: borrowCompRewardApr,
      };

      setTokenRewardData(fetchedData);
    } catch (err) {
      console.log("useTokenRewardData", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, primaryData, reloadKey]);

  useEffect(() => {
    setTokenRewardData(undefined);
    fetchTokenRewardData();
  }, [fetchTokenRewardData]);

  return { tokenRewardData, error };
};

export default useTokenRewardData;

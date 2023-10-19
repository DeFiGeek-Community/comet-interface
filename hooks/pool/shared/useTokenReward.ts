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
      const secondsPerDay = 60 * 60 * 24;
      const daysInYear = 365;
      const totalSupply = totalPoolData?.totalBaseSupplyBalance ?? 0;
      const totalBorrow = totalPoolData?.totalBaseBorrowBalance ?? 0;
      const baseAssetPrice = priceFeedData?.baseAsset ?? 0;
      const rewardAssetPrice = priceFeedData?.rewardAsset ?? 0;
      // const getBaseIndexScale = await fetchTotalDataComet(
      //   "baseIndexScale",
      //   poolData,
      // );
      // console.log("getBaseIndexScale", getBaseIndexScale)
      const baseIndexScale = Number(1e15);
      const getBaseTrackingSupplySpeed = await fetchTotalDataComet(
        "baseTrackingSupplySpeed",
        poolData,
      );
      const baseTrackingSupplySpeed = Number(getBaseTrackingSupplySpeed) ?? 0;
      const getBaseTrackingBorrowSpeed = await fetchTotalDataComet(
        "baseTrackingBorrowSpeed",
        poolData,
      );
      const baseTrackingBorrowSpeed = Number(getBaseTrackingBorrowSpeed) ?? 0;
      const suppliersPerDay =
        (baseTrackingSupplySpeed / baseIndexScale) * secondsPerDay;
      const borrowersPerDay =
        (baseTrackingBorrowSpeed / baseIndexScale) * secondsPerDay;
      const supplyCompRewardApr =
        ((rewardAssetPrice * suppliersPerDay) /
          (totalSupply * baseAssetPrice)) *
        daysInYear *
        100;
      const borrowCompRewardApr =
        ((rewardAssetPrice * borrowersPerDay) /
          (totalBorrow * baseAssetPrice)) *
        daysInYear *
        100;
      const fetchedData: TokenRewardData = {
        supplyRewardAPR: supplyCompRewardApr,
        borrowRewardAPR: borrowCompRewardApr,
      };

      setTokenRewardData(fetchedData);
    } catch (err) {
      console.log("useTokenRewardData", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, primaryData]);

  useEffect(() => {
    fetchTokenRewardData();
  }, [fetchTokenRewardData]);

  return { tokenRewardData, error };
};

export default useTokenRewardData;

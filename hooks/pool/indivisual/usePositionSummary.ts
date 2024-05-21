import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig } from "interfaces/pool";
import { useReload } from "context/ReloadContext";
import { PoolPrimaryDataContextType } from "context/PoolPrimaryDataContext";
import { CollateralAsset } from "interfaces/pool";
import { CollateralAssetsData } from "hooks/pool/indivisual/useCollateralAssets";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";

export interface PositionSummary {
  collateralBalance: number;
  borrowCapacity: number;
  liquidationPoint: number;
  availableToBorrow: number;

  collateralBalanceUSD: number;
  borrowCapacityUSD: number;
  liquidationPointUSD: number;
  availableToBorrowUSD: number;
}

function calculateAssetData(
  assetConfig: CollateralAsset,
  collateralAssetsData: CollateralAssetsData | undefined,
  priceFeedData: PriceFeedData | undefined,
) {
  const collateralFactor = assetConfig.borrowCollateralFactor / 100;
  const liquidateCollateralFactor = assetConfig.liquidateCollateralFactor / 100;
  const collateralAssetData = collateralAssetsData?.[assetConfig.symbol];
  const collateralPrice =
    priceFeedData?.collateralAssets[assetConfig.symbol] ?? 0;
  const collateralSupply = collateralAssetData?.yourSupply
    ? Number(formatUnits(collateralAssetData.yourSupply, assetConfig.decimals))
    : 0;

  const collateralUsdSupply = collateralSupply * collateralPrice;
  return {
    collateralBalanceUSD: collateralUsdSupply,
    borrowCapacityUSD: collateralUsdSupply * collateralFactor,
    liquidationPointUSD: collateralUsdSupply * liquidateCollateralFactor,
  };
}

const usePositionSummary = (
  poolData: PoolConfig | undefined,
  primaryData: PoolPrimaryDataContextType | undefined,
) => {
  const [positionSummary, setPositionSummary] = useState<PositionSummary>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchPositionSummary = useCallback(async () => {
    if (!poolData || !primaryData) {
      setPositionSummary(undefined);
      return;
    }

    try {
      const { baseAssetData, collateralAssetsData, priceFeedData } =
        primaryData;
      if (!baseAssetData || !collateralAssetsData || !priceFeedData) {
        setPositionSummary(undefined);
        return;
      }
      const basePrice = priceFeedData?.baseAsset ?? 0;

      let totals = {
        collateralBalance: 0,
        borrowCapacity: 0,
        liquidationPoint: 0,
        collateralBalanceUSD: 0,
        borrowCapacityUSD: 0,
        liquidationPointUSD: 0,
      };

      for (const assetConfig of poolData.assetConfigs) {
        const assetData = calculateAssetData(
          assetConfig,
          collateralAssetsData,
          priceFeedData,
        );
        totals.collateralBalance += assetData.collateralBalanceUSD / basePrice;
        totals.collateralBalanceUSD += assetData.collateralBalanceUSD;
        totals.borrowCapacity += assetData.borrowCapacityUSD / basePrice;
        totals.borrowCapacityUSD += assetData.borrowCapacityUSD;
        totals.liquidationPoint += assetData.liquidationPointUSD / basePrice;
        totals.liquidationPointUSD += assetData.liquidationPointUSD;
      }

      const borrowBalance = baseAssetData?.yourBorrow
        ? Number(formatUnits(baseAssetData.yourBorrow, poolData.cometDecimals))
        : 0;
      const borrowBalanceUSD = borrowBalance * basePrice;

      const fetchedData: PositionSummary = {
        collateralBalance: totals.collateralBalance,
        borrowCapacity: totals.borrowCapacity,
        liquidationPoint: totals.liquidationPoint,
        availableToBorrow: totals.borrowCapacity - borrowBalance,
        collateralBalanceUSD: totals.collateralBalanceUSD,
        borrowCapacityUSD: totals.borrowCapacityUSD,
        liquidationPointUSD: totals.liquidationPointUSD,
        availableToBorrowUSD: totals.borrowCapacityUSD - borrowBalanceUSD,
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
  }, [poolData, primaryData, reloadKey]);

  useEffect(() => {
    setPositionSummary(undefined);
    fetchPositionSummary();
  }, [fetchPositionSummary]);

  return { positionSummary, error };
};

export default usePositionSummary;

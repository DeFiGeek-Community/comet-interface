import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";
import { number } from "react-i18next/icu.macro";

export interface CollateralAssetsData {
  [symbol: string]: CollateralAssetInfo;
}

export interface CollateralAssetInfo {
  yourSupply: number | undefined;
  collateralValue: number | undefined;
}

const useCollateralAssets = (poolData: PoolConfig | undefined) => {
  const [collateralAssetsData, setCollateralAssetsData] =
    useState<CollateralAssetsData>();

  const { reloadKey } = useReload();

  const fetchCollateralAssetsData = useCallback(async () => {
    if (!poolData) {
      setCollateralAssetsData(undefined);
      return;
    }

    try {
      const data: CollateralAssetsData = {};
      for (const assetConfig of poolData.assetConfigs) {
        const supplyData = await fetchDataFromComet(
          "collateralBalanceOf",
          poolData,
          assetConfig.address,
        );
        const assetSupply = supplyData !== undefined ? Number(formatUnits(supplyData, assetConfig.decimals)) : undefined;
        const collateralValue =
          assetSupply !== undefined
            ? assetSupply * (assetConfig.borrowCollateralFactor * 0.01)
            : undefined;

        data[assetConfig.symbol] = {
          yourSupply: assetSupply,
          collateralValue: collateralValue,
        };
      }

      setCollateralAssetsData(data);
    } catch (err) {
      console.log(err);
    }
  }, [poolData]);

  useEffect(() => {
    fetchCollateralAssetsData();
  }, [fetchCollateralAssetsData, reloadKey]);

  return { collateralAssetsData };
};

export default useCollateralAssets;

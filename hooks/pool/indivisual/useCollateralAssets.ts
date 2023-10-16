import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

export interface CollateralAssetsData {
  [symbol: string]: CollateralAssetInfo;
}

export interface CollateralAssetInfo {
  yourSupply: bigint | undefined;
  collateralValue: bigint | undefined;
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
        const assetSupply = supplyData !== undefined ? supplyData : undefined;
        const collateralValue =
          assetSupply !== undefined
            ? assetSupply *
              (BigInt(assetConfig.borrowCollateralFactor) * BigInt(0.01))
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

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
        const collateralFactor = assetConfig.borrowCollateralFactor * 0.01;
        const supplyData = await fetchDataFromComet(
          "collateralBalanceOf",
          poolData,
          assetConfig.address,
        );
        const assetSupply = supplyData !== undefined ? supplyData : undefined;
        const collateralValue =
          supplyData !== undefined
            ? BigInt(Math.floor(Number(supplyData) * collateralFactor))
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
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchCollateralAssetsData();
  }, [fetchCollateralAssetsData]);

  return { collateralAssetsData };
};

export default useCollateralAssets;

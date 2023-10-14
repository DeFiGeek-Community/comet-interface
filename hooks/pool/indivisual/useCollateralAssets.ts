import { useState, useEffect, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

export interface CollateralAssetsData {
  [symbol: string]: CollateralAssetInfo;
}

export interface CollateralAssetInfo {
  yourSupply: number | undefined;
  collateralValue: number | undefined;
}

const useCollateralAssets = (
  poolData: PoolConfig | undefined
) => {
  const [collateralAssetsData, setCollateralAssetsData] = useState<CollateralAssetsData>();

  const reload = useReload();

  const fetchCollateralAssetsData = useCallback(async () => {
    if (!poolData) {
      setCollateralAssetsData(undefined);
      return;
    }

    try {
      const data: CollateralAssetsData = {};
      for (const assetConfig of poolData.assetConfigs) {
        const assetSupply = await fetchDataFromComet("collateralBalanceOf", poolData, assetConfig.address);
        const collateralValue = assetSupply !== undefined
          ? assetSupply * (assetConfig.borrowCollateralFactor * 0.001)
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
  }, [fetchCollateralAssetsData, reload]);

  return { collateralAssetsData };
};

export default useCollateralAssets;

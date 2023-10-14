import { useState, useEffect, useCallback } from "react";
import { PoolConfig, CollateralAsset } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

export interface CollateralAssetData {
  yourSupply: number | undefined;
  collateralValue: number | undefined;
}

const useCollateralAssetData = (
  asset: CollateralAsset | undefined,
  poolData: PoolConfig,
) => {
  const [collateralAssetData, setCollateralAssetData] = useState<CollateralAssetData>();
  const [error, setError] = useState<Error | null>(null);

  const reload = useReload();

  const fetchCollateralAsset = useCallback(async () => {
    if (!asset || !poolData) {
      setCollateralAssetData(undefined);
      return;
    }

    try {
      const yourSupply = await fetchDataFromComet("collateralBalanceOf", poolData, asset.address);
      const collateralValue = yourSupply !== undefined
        ? yourSupply * (asset.borrowCollateralFactor * 0.001)
        : undefined;

      setCollateralAssetData({
        yourSupply,
        collateralValue,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [asset, poolData]);

  useEffect(() => {
    fetchCollateralAsset();
  }, [fetchCollateralAsset, reload]);

  return { collateralAssetData, error };
};

export default useCollateralAssetData;

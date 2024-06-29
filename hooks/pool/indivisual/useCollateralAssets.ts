import { useState, useEffect, useCallback, useRef } from "react";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";
import { useAppData } from "context/AppDataContext";

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

  const { collateralAssetMapping } = useAppData();

  const { reloadKey } = useReload();
  const prevReloadKey = useRef(reloadKey);

  const fetchCollateralAssetsData = useCallback(async () => {
    if (!poolData) {
      setCollateralAssetsData(undefined);
      return;
    }

    // 共通データが存在する場合は、そのデータを使用
    const sharedData = collateralAssetMapping[poolData.baseToken.symbol];
    if (sharedData && prevReloadKey.current === reloadKey) {
      setCollateralAssetsData(sharedData);
      return;
    }

    try {
      console.log("useCollateralAssets");
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
    setCollateralAssetsData(undefined);
    fetchCollateralAssetsData();
  }, [fetchCollateralAssetsData]);

  return { collateralAssetsData };
};

export default useCollateralAssets;

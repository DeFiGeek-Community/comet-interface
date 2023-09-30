import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { BaseAsset, CollateralAsset } from "interfaces/pool";

interface collateralAssetData {
  yourSupply: number;
  collateralValue: number;
}

const useCollateralAssetData = (asset: CollateralAsset | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  const collateralAssetData = useMemo<collateralAssetData | undefined>(() => {
    if (!asset) {
      return undefined;
    }

    let fetchedData: collateralAssetData | undefined;

    const fetchCollateralAsset = async () => {
      try {
        // ここでデータを取得するロジックを書く

        // ダミーデータを使用
        fetchedData = {
          yourSupply: 100,
          collateralValue: 80,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchCollateralAsset();

    return fetchedData;
  }, [asset, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { collateralAssetData, error, reload };
};

export default useCollateralAssetData;

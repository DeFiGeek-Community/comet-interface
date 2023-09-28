import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { BaseAsset, CollateralAsset } from "interfaces/pool";

interface CollateralPoolData {
  yourSupply: number;
  collateralValue: number;
}

const useCollateralPoolData = (asset: BaseAsset | CollateralAsset) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  const collateralPoolData = useMemo<CollateralPoolData | undefined>(() => {
    let fetchedData: CollateralPoolData | undefined;

    const fetchCollateralPoolData = async () => {
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

    fetchCollateralPoolData();

    return fetchedData;
  }, [asset, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { collateralPoolData, error, reload };
};

export default useCollateralPoolData;

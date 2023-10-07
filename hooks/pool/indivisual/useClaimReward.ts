import { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";

interface ClaimReward {
  yourTokenReward: number;
}

const useClaimReward = (poolData: PoolConfig | undefined) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const claimReward = useMemo<ClaimReward | undefined>(() => {
    if (!poolData) {
      return undefined;
    }

    let fetchedData: ClaimReward | undefined;

    const fetchClaimReward = async () => {
      try {
        // ここでデータを取得するロジックを書く

        // ダミーデータを使用
        fetchedData = {
          yourTokenReward: 0,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchClaimReward();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { claimReward, error, reload };
};

export default useClaimReward;

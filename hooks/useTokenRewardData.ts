import { useState, useMemo } from "react";
import { useAccount } from 'wagmi';
import { PoolConfig } from "interfaces/pool";

interface TokenRewardData {
  supplyRewardAPR: number;
  borrowRewardAPR: number;
}

const useTokenRewardData = ( poolData: PoolConfig) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  const tokenRewardData = useMemo<TokenRewardData | undefined>(() => {
    let fetchedData: TokenRewardData | undefined;

    const fetchTokenRewardData = async () => {
      try {
        // ここでデータを取得するロジックを書く

        // ダミーデータを使用
        fetchedData = {
          supplyRewardAPR: 15,
          borrowRewardAPR: 10,
        };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      }
    };

    fetchTokenRewardData();

    return fetchedData;
  }, [poolData, reloadKey]);

  const reload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return { tokenRewardData, error, reload };
};

export default useTokenRewardData;

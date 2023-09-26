import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "./usePriceFeed";

interface TokenRewardData {
  supplyRewardAPR: number;
  borrowRewardAPR: number;
}

const useTokenRewardData = (poolData: PoolConfig) => {
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();
  const { priceFeedData } = usePriceFeedData(poolData);

  const tokenRewardData = useMemo<TokenRewardData | undefined>(() => {
    let fetchedData: TokenRewardData | undefined;

    const fetchTokenRewardData = async () => {
      try {
        // ここでデータを取得するロジックを書く
        // const SECONDS_PER_YEAR = 60*60*365;
        // const rewardPrice = getRewardPrice();
        // const basePrice = getBasePrice();

        // const supplyTotalAmount = getSupplyTotalAmount();
        // const supplyIndividualAmount = getSupplyIndividualAmount();
        // const supplyRewardAmount = getRewardSupplyAmount() * SECONDS_PER_YEAR;
        // const supplyRewardIndivisualAmount = getRewardSupplyAmount() * supplyIndividualAmount / supplyTotalAmount;
        // const supplyAPR = supplyRewardIndivisualAmount * rewardPrice / (supplyIndividualAmount*basePrice) * 100;

        // const borrowTotalAmount = getBorrowTotalAmount();
        // const borrowIndividualAmount = getBorrowIndividualAmount();
        // const borrowRewardAmount = getRewardBorrowAmount() * SECONDS_PER_YEAR;
        // const borrowRewardIndivisualAmount = getRewardBorrowAmount() * borrowIndividualAmount / borrowTotalAmount;
        // const borrowAPR = borrowRewardIndivisualAmount * rewardPrice / (borrowIndividualAmount*basePrice) * 100;

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

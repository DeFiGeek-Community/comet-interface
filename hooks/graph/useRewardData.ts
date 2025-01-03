import { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import { RewardDataProps } from "interfaces/graph";

const useRewardData = ({ poolData }: { poolData: PoolConfig }) => {
  const [tempRewardData, setTempRewardData] = useState<RewardDataProps>({
    borrow: undefined,
    earn: undefined,
  });
  const { priceFeedData, totalPoolData } = usePoolData();

  useEffect(() => {
    const totalSupply =
      (totalPoolData?.totalBaseSupplyBalance ?? 0) >=
      poolData?.baseMinForRewards
        ? totalPoolData?.totalBaseSupplyBalance ?? 0
        : 0;
    const totalBorrow =
      (totalPoolData?.totalBaseBorrowBalance ?? 0) >=
      poolData?.baseMinForRewards
        ? totalPoolData?.totalBaseBorrowBalance ?? 0
        : 0;
    
  }, [priceFeedData, totalPoolData]);

  return tempRewardData;
};

export default useRewardData;

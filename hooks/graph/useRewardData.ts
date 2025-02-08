import { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";

const useRewardData = ({ poolData }: { poolData: PoolConfig }) => {
  const [tempRewardData, setTempRewardData] = useState({
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
import { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import { RewardDataProps } from "interfaces/graph";
import { calculateTotalBalance, calculateRewardData } from "hooks/util/graph";

const useRewardData = ({ poolData }: { poolData: PoolConfig }) => {
  const [tempRewardData, setTempRewardData] = useState<RewardDataProps>({
    earn: undefined,
  });
  const { priceFeedData, totalPoolData } = usePoolData();

  useEffect(() => {
    if (!poolData) {
      return;
    }

    const totalSupply =
      (totalPoolData?.totalBaseSupplyBalance ?? 0) >=
      poolData?.baseMinForRewards
        ? totalPoolData?.totalBaseSupplyBalance ?? 0
        : 0;
    const totalBaseSupplyBalance = calculateTotalBalance(
      totalSupply,
      priceFeedData,
    );

    const tempSupplyRewardData = calculateRewardData(
      poolData.baseTrackingRewardSpeed,
      totalBaseSupplyBalance,
      priceFeedData?.rewardAsset,
    );

    setTempRewardData({
      earn: tempSupplyRewardData,
    });
  }, [priceFeedData, totalPoolData, poolData]);

  return tempRewardData;
};

export default useRewardData;

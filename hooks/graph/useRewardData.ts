import { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import { RewardDataProps } from "interfaces/graph";
import { calculateTotalBalance, calculateRewardData } from "hooks/util/graph";

const useRewardData = ({ poolData }: { poolData: PoolConfig }) => {
  const [tempRewardData, setTempRewardData] = useState<RewardDataProps>({
    borrow: undefined,
    earn: undefined,
  });
  const { priceFeedData, totalPoolData } = usePoolData();
  const { rate } = useAppData();

  useEffect(() => {
    const totalBaseSupplyBalance = calculateTotalBalance(
      totalPoolData?.totalBaseSupplyBalance,
      priceFeedData,
      rate,
    );
    const totalBaseBorrowBalance = calculateTotalBalance(
      totalPoolData?.totalBaseBorrowBalance,
      priceFeedData,
      rate,
    );

    const tempSupplyRewardData = calculateRewardData(
      poolData.baseTrackingRewardSpeed,
      totalBaseSupplyBalance,
    );
    const tempBorrowRewardData = calculateRewardData(
      poolData.baseTrackingRewardSpeed,
      totalBaseBorrowBalance,
    );

    setTempRewardData({
      borrow: tempBorrowRewardData,
      earn: tempSupplyRewardData,
    });
  }, [priceFeedData, totalPoolData, rate]);

  return tempRewardData;
};

export default useRewardData;

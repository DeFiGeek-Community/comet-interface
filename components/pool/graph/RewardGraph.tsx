import React from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { totalPoolData } = usePoolData();
  let utilizationValue: number | undefined;
  if (
    totalPoolData?.totalBaseBorrowBalance &&
    totalPoolData?.totalBaseSupplyBalance
  ) {
    utilizationValue =
      (totalPoolData?.totalBaseBorrowBalance /
        totalPoolData?.totalBaseSupplyBalance) *
      100;
  } else if (totalPoolData?.totalBaseBorrowBalance === 0) {
    utilizationValue = 0;
  }
  const initialUtilization = utilizationValue ?? 0; // Assign 0 if undefined
  const rateSlopeHigh = parseFloat(
    (100 / (100 - poolData.rewardKink)).toFixed(2),
  );
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: 0,
      supplyRateSlopeHigh: rateSlopeHigh,
      supplyKink: poolData.rewardKink,
    },
    borrow: {
      borrowRateSlopeLow: 0,
      borrowRateSlopeHigh: -rateSlopeHigh,
      borrowKink: poolData.rewardKink,
      borrowRateBase: 100,
    },
  };

  return (
    <GraphModel
      initialUtilization={initialUtilization}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow Reward", earn: "Earn Reward" }}
    />
  );
};

export default RewardGraph;

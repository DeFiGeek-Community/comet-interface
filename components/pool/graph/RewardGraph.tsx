import React from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { OneHundred, rateSlopeLow } from "constants/graph";

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
      OneHundred;
  } else if (totalPoolData?.totalBaseBorrowBalance === 0) {
    utilizationValue = 0;
  }
  const initialUtilization = utilizationValue ?? 0; // Assign 0 if undefined
  const rateSlopeHigh = parseFloat(
    (OneHundred / (OneHundred - poolData.rewardKink)).toFixed(2),
  );
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: rateSlopeLow,
      supplyRateSlopeHigh: rateSlopeHigh,
      supplyKink: poolData.rewardKink,
    },
    borrow: {
      borrowRateSlopeLow: rateSlopeLow,
      borrowRateSlopeHigh: -rateSlopeHigh,
      borrowKink: poolData.rewardKink,
      borrowRateBase: OneHundred,
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

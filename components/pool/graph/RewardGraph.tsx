import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const initialUtilization = 60.52;
  const rateSlopeHigh = parseFloat((100 / (100 - poolData.rewardKink)).toFixed(2));
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

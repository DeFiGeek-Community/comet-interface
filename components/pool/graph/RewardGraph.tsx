import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const initialUtilization = 60.52;
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: 0,
      supplyRateSlopeHigh: 6.67,
      supplyKink: 85,
    },
    borrow: {
      borrowRateSlopeLow: 0,
      borrowRateSlopeHigh: -6.67,
      borrowKink: 85,
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

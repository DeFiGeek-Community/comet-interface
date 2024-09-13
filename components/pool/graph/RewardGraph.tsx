import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const initialUtilization = 60.52;
  const dataKeys = {
    earn: {
      supplyPerYearInterestRateSlopeLow: 0,
      supplyPerYearInterestRateSlopeHigh: 6.67,
      supplyKink: 85,
    },
    borrow: {
      borrowPerYearInterestRateSlopeLow: 0,
      borrowPerYearInterestRateSlopeHigh: -6.67,
      borrowKink: 85,
      borrowPerYearInterestRateBase: 100,
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

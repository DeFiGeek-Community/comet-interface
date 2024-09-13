import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const APRGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const initialUtilization = 60.52;
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: poolData.borrowPerYearInterestRateSlopeLow,
      supplyRateSlopeHigh: poolData.borrowPerYearInterestRateSlopeHigh,
      supplyKink: poolData.supplyKink,
    },
    borrow: {
      borrowRateSlopeLow: poolData.borrowPerYearInterestRateSlopeLow,
      borrowRateSlopeHigh: poolData.borrowPerYearInterestRateSlopeHigh,
      borrowKink: poolData.borrowKink,
      borrowRateBase: poolData.borrowPerYearInterestRateBase,
    },
  };
  
  return (
    <GraphModel
      initialUtilization={initialUtilization}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow APR", earn: "Earn APR" }}
    />
  );
};

export default APRGraph;

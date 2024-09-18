import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const APRGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: poolData.supplyPerYearInterestRateSlopeLow,
      supplyRateSlopeHigh: poolData.supplyPerYearInterestRateSlopeHigh,
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
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow APR", earn: "Earn APR" }}
    />
  );
};

export default APRGraph;

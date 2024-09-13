import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const APRGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const initialUtilization = 60.52;
  const dataKeys = {
    earn: {
      supplyPerYearInterestRateSlopeLow: 0.04,
      supplyPerYearInterestRateSlopeHigh: 0.99,
      supplyKink: 90,
    },
    borrow: {
      borrowPerYearInterestRateSlopeLow: 0.025,
      borrowPerYearInterestRateSlopeHigh: 0.99,
      borrowKink: 90,
      borrowPerYearInterestRateBase: 2.75,
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

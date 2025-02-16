import React from "react";
import GraphModel from "./GraphModel";
import usePool from "hooks/pool/usePool";

const InterestAPRGraph = () => {
  const { poolConfig: poolData } = usePool();
  
  if (!poolData) return null;

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
      poolData={poolData}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow APR", earn: "Earn APR" }}
    />
  );
};

export default InterestAPRGraph;

import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";

const APRGraph2 = ({ poolData }: { poolData: PoolConfig }) => {
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
  //const data = useMemo(() => generateData({ dataKeys }), []);
  
  return (
    <GraphModel
      //data={data}
      initialUtilization={initialUtilization}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow APR", earn: "Earn APR" }}
    />
  );
};

export default APRGraph2;

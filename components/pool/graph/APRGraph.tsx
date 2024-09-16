import React from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { Spinner } from "@chakra-ui/react";
import { Center } from "utils/chakraUtils";
import useInitialUtilization from "hooks/graph/useInitialUtilization";

const APRGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { totalPoolData } = usePoolData();
  const initialUtilization = useInitialUtilization(totalPoolData);
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
    <>
      {totalPoolData ? (
        <GraphModel
          initialUtilization={initialUtilization}
          dataKeys={dataKeys}
          labels={{ borrow: "Borrow APR", earn: "Earn APR" }}
        />
      ) : (
        <Center height="200px">
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default APRGraph;

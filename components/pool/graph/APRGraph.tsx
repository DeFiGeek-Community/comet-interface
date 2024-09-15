import React, { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { OneHundred } from "constants/graph";
import { Spinner } from "@chakra-ui/react";
import { Center } from "utils/chakraUtils";

const APRGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { totalPoolData } = usePoolData();
  const [initialUtilization, setInitialUtilization] = useState(0);

  useEffect(() => {
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
    setInitialUtilization(utilizationValue ?? 0);
  }, [totalPoolData]);
  console.log(initialUtilization);
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

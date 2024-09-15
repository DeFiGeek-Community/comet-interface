import React from "react";
import usePoolData from "hooks/pool/usePoolData";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { OneHundred, rateSlopeLow } from "constants/graph";
import { Spinner } from "@chakra-ui/react";
import { Center } from "utils/chakraUtils";
import useInitialUtilization from "hooks/graph/useInitialUtilization";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { totalPoolData } = usePoolData();
  const initialUtilization = useInitialUtilization(totalPoolData); 
  const rateSlopeHigh = parseFloat(
    (OneHundred / (OneHundred - poolData.rewardKink)).toFixed(2),
  );
  const dataKeys = {
    earn: {
      supplyRateSlopeLow: rateSlopeLow,
      supplyRateSlopeHigh: rateSlopeHigh,
      supplyKink: poolData.rewardKink,
    },
    borrow: {
      borrowRateSlopeLow: rateSlopeLow,
      borrowRateSlopeHigh: -rateSlopeHigh,
      borrowKink: poolData.rewardKink,
      borrowRateBase: OneHundred,
    },
  };

  return (
    <>
      {totalPoolData ? (
        <GraphModel
          initialUtilization={initialUtilization ?? 0}
          dataKeys={dataKeys}
          labels={{ borrow: "Borrow Reward", earn: "Earn Reward" }}
        />
      ) : (
        <Center height="200px">
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default RewardGraph;

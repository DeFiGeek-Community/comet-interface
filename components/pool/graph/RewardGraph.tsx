import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { OneHundred, rateSlopeLow } from "constants/graph";
import useRewardData from "hooks/graph/useRewardData";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const tempRewardData = useRewardData({ poolData });

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
    <GraphModel
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow Reward", earn: "Earn Reward" }}
      rewardAPRValue={{
        borrow: tempRewardData.borrow,
        earn: tempRewardData.earn,
      }}
    />
  );
};

export default RewardGraph;

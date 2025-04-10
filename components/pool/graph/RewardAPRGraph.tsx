import React from "react";
import GraphModel from "./GraphModel";
import { OneHundred, rateSlopeLow } from "constants/graph";
import usePoolData from "hooks/pool/usePoolData";
import usePool from "hooks/pool/usePool";

const RewardAPRGraph = () => {
  const { tokenRewardData } = usePoolData();
  const { poolConfig: poolData } = usePool();

  if (!poolData) return null;

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
      poolData={poolData}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow Reward", earn: "Earn Reward" }}
      rewardAPRValue={{
        borrow: tokenRewardData?.borrowRewardAPR ?? 0,
        earn: tokenRewardData?.supplyRewardAPR ?? 0,
      }}
    />
  );
};

export default RewardAPRGraph;

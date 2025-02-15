import React from "react";
import { PoolConfig } from "interfaces/pool";
import GraphModel from "./GraphModel";
import { OneHundred, rateSlopeLow } from "constants/graph";
import usePoolData from "hooks/pool/usePoolData";

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { tokenRewardData } = usePoolData();

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
      poolData = {poolData}
      dataKeys={dataKeys}
      labels={{ borrow: "Borrow Reward", earn: "Earn Reward" }}
      rewardAPRValue={{
        borrow: tokenRewardData?.borrowRewardAPR ?? 0,
        earn: tokenRewardData?.supplyRewardAPR ?? 0,
      }}
    />
  );
};

export default RewardGraph;

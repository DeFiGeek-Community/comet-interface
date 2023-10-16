import React from "react";
import { PoolConfig } from "interfaces/pool";
import PoolSecondaryDataContext from "context/PoolSecondaryDataContext";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import usePositionSummary from "hooks/pool/indivisual/usePositionSummary";
import useClaimReward from "hooks/pool/indivisual/useClaimReward";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";

interface PoolSecondaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const PoolSecondaryDataProvider: React.FC<
  PoolSecondaryDataProviderProps
> = ({ poolData, children }) => {
  const primaryData = usePoolPrimaryDataContext();
  const { tokenRewardData } = useTokenRewardData(poolData, primaryData);
  const { positionSummary } = usePositionSummary(poolData, primaryData);

  return (
    <PoolSecondaryDataContext.Provider
      value={{ tokenRewardData, positionSummary }}
    >
      {children}
    </PoolSecondaryDataContext.Provider>
  );
};

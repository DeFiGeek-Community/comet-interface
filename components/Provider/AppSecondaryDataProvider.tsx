import React from "react";
import { PoolConfig } from "interfaces/pool";
import AppSecondaryDataContext from "context/AppSecondaryDataContext";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import usePositionSummary from "hooks/pool/indivisual/usePositionSummary";
import { useAppPrimaryDataContext } from "hooks/pool/useAppPrimaryDataContext";

interface AppSecondaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const AppSecondaryDataProvider: React.FC<
  AppSecondaryDataProviderProps
> = ({ poolData, children }) => {
  const primaryData = useAppPrimaryDataContext();
  const { tokenRewardData } = useTokenRewardData(poolData, primaryData);
  const { positionSummary } = usePositionSummary(poolData, primaryData);

  return (
    <AppSecondaryDataContext.Provider
      value={{ tokenRewardData, positionSummary }}
    >
      {children}
    </AppSecondaryDataContext.Provider>
  );
};

import PoolPrimaryDataContext from "context/PoolPrimaryDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useClaimReward from "hooks/pool/indivisual/useClaimReward";

interface PoolPrimaryDataProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const PoolPrimaryDataProvider: React.FC<
  PoolPrimaryDataProviderProps
> = ({ poolData, children }) => {
  const { priceFeedData } = usePriceFeedData(poolData);
  const { baseAssetData } = useBaseAsset(poolData);
  const { collateralAssetsData } = useCollateralAssets(poolData);
  const { totalPoolData } = useTotalPoolData(poolData);
  const { claimReward } = useClaimReward(poolData);

  return (
    <PoolPrimaryDataContext.Provider
      value={{
        priceFeedData,
        baseAssetData,
        collateralAssetsData,
        totalPoolData,
        claimReward,
      }}
    >
      {children}
    </PoolPrimaryDataContext.Provider>
  );
};

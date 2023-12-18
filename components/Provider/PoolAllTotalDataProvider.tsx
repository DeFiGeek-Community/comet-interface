import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import useClaimReward from "hooks/pool/indivisual/useClaimReward";

interface PoolAllTotalDataProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const PoolAllTotalDataProvider: React.FC<
PoolAllTotalDataProviderProps
> = ({ poolData, children }) => {
  const { priceFeedData } = usePriceFeedData(poolData);
  const { baseAssetData } = useBaseAsset(poolData);
  const { collateralAssetsData } = useCollateralAssets(poolData);
  const { totalPoolData } = useTotalPoolData(poolData);
  const { claimReward } = useClaimReward(poolData);

  return (
    <PoolAllTotalDataContext.Provider
      value={{
        priceFeedData,
        baseAssetData,
        collateralAssetsData,
        totalPoolData,
        claimReward,
      }}
    >
      {children}
    </PoolAllTotalDataContext.Provider>
  );
};

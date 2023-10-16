import { createContext } from "react";
import { TokenRewardData } from "hooks/pool/shared/useTokenReward";
import { PositionSummary } from "hooks/pool/indivisual/usePositionSummary";

interface PoolSecondaryDataContextType {
  tokenRewardData: TokenRewardData | undefined;
  positionSummary: PositionSummary | undefined;
}

const PoolSecondaryDataContext = createContext<
  PoolSecondaryDataContextType | undefined
>(undefined);
export default PoolSecondaryDataContext;

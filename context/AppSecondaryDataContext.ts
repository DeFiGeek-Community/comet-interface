import { createContext } from "react";
import { TokenRewardData } from "hooks/pool/shared/useTokenReward";
import { PositionSummary } from "hooks/pool/indivisual/usePositionSummary";

interface AppSecondaryDataContextType {
  tokenRewardData: TokenRewardData | undefined;
  positionSummary: PositionSummary | undefined;
}

const AppSecondaryDataContext = createContext<
  AppSecondaryDataContextType | undefined
>(undefined);
export default AppSecondaryDataContext;

import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { PoolConfig } from "interfaces/pool";
import { fetchDataFromComet } from "hooks/util/cometContractUtils";
import { useReload } from "context/ReloadContext";

interface ClaimReward {
  yourTokenReward: number | undefined;
}

const useClaimReward = (poolData: PoolConfig | undefined) => {
  const [claimReward, setClaimReward] = useState<ClaimReward>();
  const [error, setError] = useState<Error | null>(null);

  const reload = useReload();

  const fetchClaimReward = useCallback(async () => {
    if (!poolData) {
      setClaimReward(undefined);
      return;
    }
    try {
      const tokenReward = await fetchDataFromComet(
        "baseTrackingAccrued",
        poolData,
      );
      const yourTokenReward = tokenReward !== undefined ? Number(formatUnits(tokenReward, poolData.cometDecimals)) : undefined;
      setClaimReward({ yourTokenReward });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData]);

  useEffect(() => {
    fetchClaimReward();
  }, [fetchClaimReward, reload]);

  return { claimReward, error };
};

export default useClaimReward;

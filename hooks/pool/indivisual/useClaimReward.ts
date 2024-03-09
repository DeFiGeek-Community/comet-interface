import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "viem";
import { getAccount, prepareWriteContract } from "@wagmi/core";
import { PoolConfig } from "interfaces/pool";
import rewardsAbi from "static/rewards.json";
import { useReload } from "context/ReloadContext";

export interface ClaimReward {
  yourTokenReward: number | undefined;
}

const useClaimReward = (poolData: PoolConfig | undefined) => {
  const [claimReward, setClaimReward] = useState<ClaimReward>();
  const [error, setError] = useState<Error | null>(null);

  const { reloadKey } = useReload();

  const fetchClaimReward = useCallback(async () => {
    const { address } = getAccount();
    if (!poolData || !address) {
      setClaimReward(undefined);
      return;
    }
    try {
      const request = await prepareWriteContract({
        address: poolData.reward,
        abi: rewardsAbi,
        functionName: "getRewardOwed",
        args: [poolData.proxy, address],
      });
      const owed = (request.result as { owed: bigint }).owed;
      const yourTokenReward =
        request?.result !== undefined
          ? Number(formatUnits(owed, 18))
          : undefined;
      setClaimReward({ yourTokenReward });
    } catch (err) {
      console.log("useClaimReward", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [poolData, reloadKey]);

  useEffect(() => {
    fetchClaimReward();
  }, [fetchClaimReward]);

  return { claimReward, error };
};

export default useClaimReward;

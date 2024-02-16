import React, { useEffect } from "react";
import { useNetwork } from "wagmi";
import PoolPage from "components/PoolPage";
import { useChainPool } from "hooks/useChainPool";
import { ReloadContextProvider } from "components/Provider/ReloadContextProvider";
import { useRouter } from "next/router";
import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";

const Pool = () => {
  const router = useRouter();
  const { setChainId, setPoolName } = useChainPool();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain, setChainId]);

  useEffect(() => {
    if (router.isReady) {
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
    }
  }, [router.isReady, router.query.pool, setPoolName]);

  return (
    <ReloadContextProvider>
      <PoolPage />
    </ReloadContextProvider>
  );
};

export default Pool;

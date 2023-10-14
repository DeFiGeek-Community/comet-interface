import React, { useState, useEffect, useCallback } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolPage from "components/PoolPage";
import { PoolContext } from "context/PoolContext";
import { ReloadContext } from "context/ReloadContext";
import { useRouter } from "next/router";

const Pool = () => {
  const { chain } = useNetwork();
  const router = useRouter();
  const [chainId, setChainId] = useState<number>(chain?.id || 1);
  const [poolName, setPoolName] = useState<string>("");
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((reloadKey) => reloadKey + 1);
  }, []);

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  useEffect(() => {
    if (router.isReady) {
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
    }
  }, [router.isReady, router.query.pool]);

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <PoolContext.Provider
      value={{ chainId, poolName, setChainId, setPoolName }}
    >
      <ReloadContext.Provider value={reload}>
        {isRendered && router.isReady ? (
          <PoolPage />
        ) : (
          <Center height="100vh">
            <HashLoader color="#FFF" />
          </Center>
        )}
      </ReloadContext.Provider>
    </PoolContext.Provider>
  );
};

export default Pool;

import React, { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolPage from "components/PoolPage";
import PoolList from "components/PoolList";
import { ReloadContextProvider } from "components/Provider/ReloadContextProvider";
import { PoolContext } from "context/PoolContext";
import { useRouter } from "next/router";

const Pool = () => {
  const { chain } = useNetwork();
  const router = useRouter();
  const [chainId, setChainId] = useState<number>(chain?.id || 1);
  const [poolName, setPoolName] = useState<string>("");

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
      <ReloadContextProvider>
        {isRendered && router.isReady ? (
          <PoolList />
        ) : (
          <Center height="100vh">
            <HashLoader color="#FFF" />
          </Center>
        )}
      </ReloadContextProvider>
    </PoolContext.Provider>
  );
};

export default Pool;

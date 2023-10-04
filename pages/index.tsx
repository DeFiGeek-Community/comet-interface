import React, { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolPage from "components/PoolPage";
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
      {isRendered && router.isReady ? (
        <PoolPage />
      ) : (
        <Center height="100vh">
          <HashLoader color="#FFF" />
        </Center>
      )}
    </PoolContext.Provider>
  );
};

export default Pool;

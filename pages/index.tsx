import React, { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolPage from "components/PoolPage";
import PoolList from "components/PoolList";
import PoolContents from "components/PoolContents";
import { ReloadContextProvider } from "components/Provider/ReloadContextProvider";
import { PoolContext } from "context/PoolContext";
import { useRouter } from "next/router";

const Pool = () => {
  const { chain } = useNetwork();
  const router = useRouter();
  const [chainId, setChainId] = useState<number>(chain?.id || 1);
  const [poolName, setPoolName] = useState<string>("");
  const [isDetail, setIsDetail] = useState<boolean>(false);

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  useEffect(() => {
    if (router.isReady) {
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
      setIsDetail(
        router.query.isDetail
          ? router.query.isDetail === "true"
            ? true
            : false
          : false,
      );
    }
  }, [router.isReady, router.query.pool, router.query.isDetail]);

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
          <PoolContents isDetail={isDetail}/>
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

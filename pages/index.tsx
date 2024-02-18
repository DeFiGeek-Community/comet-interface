import React, { useEffect } from "react";
import { useNetwork } from "wagmi";
import PoolList from "components/PoolList";
import { useChainPool } from "hooks/useChainPool";
import { ReloadContextProvider } from "components/Provider/ReloadContextProvider";
import { useRouter } from "next/router";
// import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";
// import { useAppData } from "context/AppDataContext";
// import { POOL_CONFIG_MAP } from "constants/pools";
// import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

const Pool = () => {
  const router = useRouter();
  const { setChainId, setPoolName } = useChainPool();
  const { chain } = useNetwork();
  // const { totalPoolData, updateTotalPoolData } = useAppData();

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
      // Object.values(POOL_CONFIG_MAP[chain.id]).map((data, index) => {
      // const { totalPoolData, error } = useTotalPoolData(data);
      // const tokenData = data.baseToken;
      // const symbol = tokenData?.symbol ?? "";
      // if(totalPoolData) updateTotalPoolData(symbol,totalPoolData);
      // })
      // console.log(totalPoolData);
    }
  }, [chain, setChainId]);

  useEffect(() => {
    if (router.isReady) {
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
    }
  }, [router.isReady, router.query.pool, setPoolName]);

  return (
    <ReloadContextProvider>
      <PoolList />
    </ReloadContextProvider>
  );
};

export default Pool;

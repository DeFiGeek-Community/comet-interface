import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppData } from "context/AppDataContext";
import usePool from "hooks/pool/usePool";
import Main from "components/Main";

const Pool = () => {
  const { pageName, setPageName } = useAppData();
  const { setPoolName } = usePool();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && pageName === "") {
      setPageName("pool");
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
    }
  }, [router.isReady, pageName]);

  return <Main />;
};

export default Pool;

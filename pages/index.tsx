import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppData } from "context/AppDataContext";
import Main from "components/Main";

const List = () => {
  const { pageName, setPageName } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && pageName === "") {
      setPageName("list");
    }
  }, [router.isReady, pageName]);

  return <Main />;
};

export default List;

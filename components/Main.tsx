import React, { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { useAppData } from "context/AppDataContext";
import { useReload } from "context/ReloadContext";
import PoolList from "./PoolList";
import PoolPage from "./PoolPage";
import { Column, useIsMobile } from "utils/chakraUtils";
import { Header } from "components/layouts/Header";
import Footer from "components/layouts/Footer";
import MetaTags from "components/layouts/MetaTags";

const Main = () => {
  const { pageName } = useAppData();
  const { address } = useAccount();
  const { reload } = useReload();
  const isFirstRender = useRef(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (address) {
      reload();
    }
  }, [address, reload]);

  return (
    <>
      <MetaTags />
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        color="#FFFFFF"
        mx="auto"
        width={isMobile ? "100%" : "1150px"}
        px={isMobile ? 4 : 0}
      >
        <Header />
        {pageName === "list" && <PoolList />}
        {pageName === "pool" && <PoolPage />}
        <Footer />
      </Column>
    </>
  );
};

export default Main;

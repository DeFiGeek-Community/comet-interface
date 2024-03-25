import React, { useEffect, memo } from "react";
import { Column, useIsMobile } from "utils/chakraUtils";
import StatsBarForPoolList from "components/pool/StatsBarForPoolList";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import PoolTable from "components/list/PoolTable";
import { useAccount } from "wagmi";
import { useReload } from "context/ReloadContext";

const PoolList = memo(() => {
  const isMobile = useIsMobile();
  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address, reload]);

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      color="#FFFFFF"
      mx="auto"
      width={isMobile ? "100%" : "1150px"}
      px={isMobile ? 4 : 0}
    >
      <Header />
      <StatsBarForPoolList isPoolList={true} />
      <PoolTable />
      <Footer />
    </Column>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

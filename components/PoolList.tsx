import React, { memo } from "react";
import { Column, useIsMobile } from "utils/chakraUtils";
import StatsBarTest from "components/pool/StatsBarTest";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import PoolTable from "components/list/PoolTable";

const PoolList = memo(() => {
  const isMobile = useIsMobile();

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
      <StatsBarTest isPoolList={true} />
      <PoolTable />
      <Footer />
    </Column>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

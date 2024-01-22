import React, { memo, useEffect, useState } from "react";
import { Column, useIsMobile } from "utils/chakraUtils";
import StatsBarTest from "components/pool/StatsBarTest";
import Footer from "components/shared/Footer";
import { HeaderTest } from "components/shared/HeaderTest";
import { CurrencyProviderTest } from "components/Provider/currencyProviderTest";
import PoolTable from "components/list/PoolTable";
import { useNetwork } from "wagmi";

const PoolList = memo(() => {
  const isMobile = useIsMobile();

  return (
    <CurrencyProviderTest>
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        color="#FFFFFF"
        mx="auto"
        width={isMobile ? "100%" : "1150px"}
        px={isMobile ? 4 : 0}
      >
        <HeaderTest />
        <StatsBarTest isPoolList={true} />
        <PoolTable />
        <Footer />
      </Column>
    </CurrencyProviderTest>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

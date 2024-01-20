import React, { memo, useState, useEffect } from "react";
import { Column, useIsMobile } from "utils/chakraUtils";
import StatsBar from "components/pool/StatsBar";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import { CurrencyProvider } from "components/Provider/currencyProvider";
import PoolTable from "components/list/PoolTable";
import { useNetwork } from "wagmi";
import { SupportedPoolName, PoolNames } from "constants/pools";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";

const PoolContents = memo(() => {
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
          <StatsBar isPoolList={true} />
          <PoolTable />
          <Footer />
        </Column>
  );
});

PoolContents.displayName = "PoolContents";

export default PoolContents;

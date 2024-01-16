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
  const poolData = usePoolData();
  const isMobile = useIsMobile();
  const { chain } = useNetwork();

  const [allPoolName, setAllPoolName] = useState<PoolNames | undefined>();

  useEffect(() => {
    if (chain) {
      const tempAllPoolName = SupportedPoolName[chain?.id];
      setAllPoolName(tempAllPoolName);
    }
  }, [chain]);

  return (
    <PoolPrimaryDataProvider poolData={poolData}>
      <CurrencyProvider>
        <PoolAllTotalDataProvider chainId={chain?.id} allPoolName={allPoolName}>
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
        </PoolAllTotalDataProvider>
      </CurrencyProvider>
    </PoolPrimaryDataProvider>
  );
});

PoolContents.displayName = "PoolContents";

export default PoolContents;

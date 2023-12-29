import React, { memo, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Column, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import StatsBar from "components/pool/StatsBar";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import { CurrencyProvider } from "components/Provider/currencyProvider";
import PoolTable from "components/shared/PoolTable";
import { useNetwork } from "wagmi";
import { SupportedPoolName, PoolNames } from "constants/pools";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";

const PoolList = memo(() => {
  const poolData = usePoolData();
  const isMobile = useIsMobile();
  const { chain } = useNetwork();

  const [allPoolName, setAllPoolName] = useState<PoolNames | undefined>();

  useEffect(() => {
    if (chain) {
      const tempolaryAllPoolName = SupportedPoolName[chain?.id];
      setAllPoolName(tempolaryAllPoolName);
    }
  }, [chain]);

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

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

PoolList.displayName = "PoolList";

export default PoolList;

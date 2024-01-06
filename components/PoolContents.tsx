import React, { memo, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import StatsBar from "components/pool/StatsBar";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import { CurrencyProvider } from "components/Provider/currencyProvider";
import PoolTable from "components/shared/PoolTable";
import { useNetwork } from "wagmi";
import { SupportedPoolName, PoolNames } from "constants/pools";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import { PoolSecondaryDataProvider } from "components/Provider/PoolSecondaryDataProvider";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";

import { Spinner } from "@chakra-ui/react";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import ClaimReward from "components/pool/ClaimReward";
import DashboardBox from "components/shared/DashboardBox";

const PoolContents = memo(({isDetail,}:{isDetail:boolean}) => {
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
      <PoolSecondaryDataProvider poolData={poolData}>
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
            {isDetail?
            (<>
            {/* <TabBar /> */}
            <StatsBar poolData={poolData} />
            <CollateralRatioBar poolData={poolData} />

            <DashboardBox mt={4} width={"100%"}>
              {poolData ? (
                <BaseList poolData={poolData} />
              ) : (
                <Center height="200px">
                  <Spinner />
                </Center>
              )}
            </DashboardBox>

            <DashboardBox ml={0} mt={4} width={"100%"}>
              {poolData ? (
                <CollateralList poolData={poolData} />
              ) : (
                <Center height="200px">
                  <Spinner />
                </Center>
              )}
            </DashboardBox>
            <DashboardBox ml={0} mt={4} width={"100%"}>
              {poolData ? (
                <ClaimReward poolData={poolData} />
              ) : (
                <Center height="100px">
                  <Spinner />
                </Center>
              )}
            </DashboardBox>
            </>):
            (<>
            <StatsBar isPoolList={true} />
            <PoolTable />
            </>)
            }
            <Footer />
          </Column>
        </PoolAllTotalDataProvider>
        </PoolSecondaryDataProvider>
      </CurrencyProvider>
    </PoolPrimaryDataProvider>
  );
});

PoolContents.displayName = "PoolContents";

export default PoolContents;

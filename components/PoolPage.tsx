import React, { memo, useEffect } from "react";
import { useAccount } from "wagmi";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import StatsBar from "components/pool/StatsBar";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import { CurrencyProvider } from "components/Provider/currencyProvider";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import { PoolSecondaryDataProvider } from "components/Provider/PoolSecondaryDataProvider";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { Spinner } from "@chakra-ui/react";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import ClaimReward from "components/pool/ClaimReward";
import DashboardBox from "components/shared/DashboardBox";

const PoolContents = memo(() => {
  const poolData = usePoolData();
  const isMobile = useIsMobile();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

  return (
    <PoolPrimaryDataProvider poolData={poolData}>
      <CurrencyProvider>
        <PoolSecondaryDataProvider poolData={poolData}>
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            color="#FFFFFF"
            mx="auto"
            width={isMobile ? "100%" : "1150px"}
            px={isMobile ? 4 : 0}
          >
            <Header />
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
            <Footer />
          </Column>
        </PoolSecondaryDataProvider>
      </CurrencyProvider>
    </PoolPrimaryDataProvider>
  );
});

PoolContents.displayName = "PoolContents";

export default PoolContents;

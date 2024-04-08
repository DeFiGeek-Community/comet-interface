import React, { memo, useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { useReload } from "context/ReloadContext";
import { usePoolName } from "hooks/usePoolName";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import { PoolSecondaryDataProvider } from "components/Provider/PoolSecondaryDataProvider";
import StatsBar from "components/pool/StatsBar";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import ClaimReward from "components/pool/ClaimReward";
import DashboardBox from "components/shared/DashboardBox";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";

const PoolContents = memo(() => {
  const poolData = usePoolData();
  const isMobile = useIsMobile();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address, reload]);

  const router = useRouter();
  const { poolName, setPoolName } = usePoolName();

  useEffect(() => {
    if (router.isReady) {
      setPoolName(router.query.pool ? (router.query.pool as string) : "CJPY");
    }
  }, [router.isReady, router.query.pool, setPoolName]);

  return (
      <PoolPrimaryDataProvider poolData={poolData}>
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
      </PoolPrimaryDataProvider>
  );
});

PoolContents.displayName = "PoolContents";

export default PoolContents;

import React, { memo } from "react";
import { Spinner } from "@chakra-ui/react";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { useChainPool } from "hooks/useChainPool";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import StatsBar from "components/pool/StatsBar";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import ClaimReward from "components/pool/ClaimReward";
import DashboardBox from "components/shared/DashboardBox";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";

const PoolPage = memo(() => {
  const isMobile = useIsMobile();
  const { chainId, poolName } = useChainPool();

  const poolData = usePoolData();

  return (
    <PoolPrimaryDataProvider poolData={poolData}>
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
    </PoolPrimaryDataProvider>
  );
});

PoolPage.displayName = "PoolPage";

export default PoolPage;

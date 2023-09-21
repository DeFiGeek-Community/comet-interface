import React, { memo } from "react";
import { Spinner } from "@chakra-ui/react";
import { Column, Center, RowOrColumn, useIsMobile } from "utils/chakraUtils";
import StatsBar from "components/pool/StatsBar";
import TabBar from "components/pool/TabBar";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import DashboardBox from "components/shared/DashboardBox";
import Footer from "components/shared/Footer";
import { Header } from "./shared/Header";
import { CTokenAvatarGroup, CTokenIcon } from "components/shared/CTokenIcon";

// ダミーデータ
import { dummyData } from "../dummyData";

const PoolPage = memo(() => {
  const isMobile = useIsMobile();

  return (
    <>
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
        <StatsBar data={dummyData} />
        <CollateralRatioBar />

        <DashboardBox mt={4} width={"100%"}>
          {dummyData ? (
            <BaseList
              assets={dummyData.assets}
              comptrollerAddress={dummyData.comptroller}
            />
          ) : (
            <Center height="200px">
              <Spinner />
            </Center>
          )}
        </DashboardBox>

        <DashboardBox ml={0} mt={4} width={"100%"}>
          {dummyData ? (
            <CollateralList
              assets={dummyData.assets}
              comptrollerAddress={dummyData.comptroller}
              supplyBalanceUSD={dummyData.totalSupplyBalanceUSD}
            />
          ) : (
            <Center height="200px">
              <Spinner />
            </Center>
          )}
        </DashboardBox>
        <Footer />
      </Column>
    </>
  );
});

PoolPage.displayName = "PoolPage";

export default PoolPage;

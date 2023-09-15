import { memo } from "react";
import { Spinner } from "@chakra-ui/react";
import {
  Column,
  Center,
  RowOrColumn,
  useIsMobile,
} from "../utils/chakraUtils";
import FuseStatsBar from "./pool/StatsBar";
import FuseTabBar from "./pool/TabBar";
import CollateralRatioBar from "./pool/CollateralRatioBar";
import BaseSupplyList from "./pool/BaseSupplyList";
import CollateralSupplyList from "./pool/CollateralSupplyList";
import BorrowList from "./pool/BorrowList";
import { AdminAlert } from "./shared/AdminAlert";
import DashboardBox from "./shared/DashboardBox";
import Footer from "./shared/Footer";
import { Header } from "./shared/Header";
import { CTokenAvatarGroup, CTokenIcon } from "./shared/CTokenIcon";

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
        <FuseStatsBar data={dummyData} />
        <FuseTabBar />
        <CollateralRatioBar/>

        <RowOrColumn
          width="100%"
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          mt={4}
          isRow={!isMobile}
        >
          <DashboardBox width={isMobile ? "100%" : "50%"}>
            {dummyData ? (
              <>
                <BaseSupplyList
                  assets={dummyData.assets}
                  comptrollerAddress={dummyData.comptroller}
                  supplyBalanceUSD={dummyData.totalSupplyBalanceUSD}
                />
                <CollateralSupplyList
                  assets={dummyData.assets}
                  comptrollerAddress={dummyData.comptroller}
                  supplyBalanceUSD={dummyData.totalSupplyBalanceUSD}
                />
              </>
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )}
          </DashboardBox>

          <DashboardBox
            ml={isMobile ? 0 : 4}
            mt={isMobile ? 4 : 0}
            width={isMobile ? "100%" : "50%"}
          >
            {dummyData ? (
              <BorrowList
                comptrollerAddress={dummyData.comptroller}
                assets={dummyData.assets}
                borrowBalanceUSD={dummyData.totalBorrowBalanceUSD}
              />
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )}
          </DashboardBox>
        </RowOrColumn>
        <Footer />
      </Column>
    </>
  );
});

PoolPage.displayName = "PoolPage";

export default PoolPage;

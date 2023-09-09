import { memo, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Link,
  Progress,
  Spinner,
  Switch,
  Text,
  useDisclosure,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/alert";

import {
  Column,
  Center,
  Row,
  RowOrColumn,
  useIsMobile
} from "../../utils/chakraUtils";
import { motion } from "framer-motion";
import FuseStatsBar from "./pool/FuseStatsBar";
import FuseTabBar from "./pool/FuseTabBar";
import CollateralRatioBar from "./pool/CollateralRatioBar";
import RiskyPoolAlert from "./pool/RiskyPoolAlert";
import SupplyList from "./pool/SupplyList";
import BorrowList from "./pool/BorrowList";
import { AdminAlert } from "../shared/AdminAlert";
import DashboardBox from "../shared/DashboardBox";
import { GlowingBox } from "../shared/GlowingButton";
import Footer from "../shared/Footer";
import { Header } from "../shared/Header";
import { CTokenAvatarGroup, CTokenIcon } from "../shared/CTokenIcon";
import { FusePoolData } from "../../utils/fetchFusePoolData";

// ダミーデータ
const dummyData: FusePoolData = {
  assets: [
    {
      cToken: "0xcTokenAddress",
      borrowBalance: 100,
      supplyBalance: 200,
      liquidity: 300,
      membership: true,
      underlyingName: "DummyToken",
      underlyingSymbol: "DTK",
      underlyingToken: "0xUnderlyingTokenAddress",
      underlyingDecimals: 18,
      underlyingPrice: 1.5,
      underlyingBalance: 250,
      collateralFactor: 0.75,
      reserveFactor: 0.1,
      adminFee: 0.01,
      fuseFee: 0.01,
      oracle: "0xOracleAddress",
      borrowRatePerBlock: 0.0001,
      supplyRatePerBlock: 0.0002,
      totalBorrow: 150,
      totalSupply: 350,
      supplyBalanceUSD: 300,
      borrowBalanceUSD: 150,
      totalSupplyUSD: 525,
      totalBorrowUSD: 225,
      liquidityUSD: 450,
      isPaused: false,
      tokenData: {
        name: "DummyToken",
        symbol: "DTK",
        address: "0xTokenAddress",
        decimals: 18,
        color: "#627EEA",
        overlayTextColor: "#fff",
        logoURL: "https://dummyimage.com/64x64/627EEA/ffffff&text=DTK",
      }
    },
    // 必要に応じて、他のアセットのダミーデータもこの配列に追加できます。
  ],
  comptroller: "0x1234567890abcdef",
  name: "Dummy Pool",
  oracle: "0xOracleAddress2",
  oracleModel: "ModelName",
  isPrivate: false,
  totalLiquidityUSD: 10000,
  totalSuppliedUSD: 5000,
  totalBorrowedUSD: 2500,
  totalSupplyBalanceUSD: 1000,
  totalBorrowBalanceUSD: 500,
  id: 1,
  admin: "0xAdminAddress",
  isAdminWhitelisted: true,
};



const dummyIncentivesData = {
  hasIncentives: true, // 任意の値
  rewardTokensData: {}, // このオブジェクトを適切なダミーデータで埋めてください。
};

const FusePoolPage = memo(() => {
  const isMobile = false; // これは仮の値です。適切な値に置き換えてください。

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
        {/* 以下のコンポーネントはそのまま残しています。必要に応じてダミーデータを追加してください。 */}
        <Header />
        <FuseStatsBar />
        {/* <FuseTabBar /> */}
        <CollateralRatioBar/>
        {/* <AdminAlert isAdmin={true} /> */}
        {/* <PendingAdminAlert comptroller={dummyData?.comptroller} /> */}
        {/* <RiskyPoolAlert /> */}

        {dummyIncentivesData.hasIncentives && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%" }}
          >
            <GlowingBox w="100%" h="50px" mt={4}>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                h="100%"
                w="100"
                p={3}
              >
                <Heading fontSize="md" ml={2}>
                  {" "}
                  🎉 This pool is offering rewards
                </Heading>
                <CTokenAvatarGroup
                  tokenAddresses={Object.keys(dummyIncentivesData.rewardTokensData)}
                  ml={2}
                  mr={2}
                  popOnHover={true}
                />
              </Row>
            </GlowingBox>
          </motion.div>
        )}

        <RowOrColumn
          width="100%"
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          mt={4}
          isRow={!isMobile}
        >
          <DashboardBox width={isMobile ? "100%" : "50%"}>
            {dummyData ? (
              <SupplyList
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

export default FusePoolPage;

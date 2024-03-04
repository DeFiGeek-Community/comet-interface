import React, { useEffect, useState } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import PoolTableRow from "components/list/PoolTableRow";
// import PoolTableRow from "components/list/PoolTableRowTest";
import { POOL_CONFIG_MAP } from "constants/pools";
import { useAccount } from "wagmi";
import { useChainPool } from "hooks/useChainPool";
import { useAppData } from "context/AppDataContext";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

function RenderPoolTableRow (){
  const { chainId } = useChainPool();
  return Object.values(POOL_CONFIG_MAP[chainId])?.map((data, index) => {
    if (data.baseToken) return <PoolTableRow poolData={data} key={index} />;
  });
};

const PoolTable = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { chainId } = useChainPool();
  const [isReady, setIsReady] = useState(false);
  const { address } = useAccount();

  const {
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();
  
  const objCJPY = POOL_CONFIG_MAP[chainId]["CJPY"];
  const { priceFeedData: priceFeedDataCJPY } = usePriceFeedData(objCJPY);
  const { totalPoolData: totalPoolDataCJPY } = useTotalPoolData(objCJPY);
  const objUSDC = POOL_CONFIG_MAP[chainId]["USDC"];
  const { priceFeedData: priceFeedDataUSDC } = usePriceFeedData(objUSDC);
  const { totalPoolData: totalPoolDataUSDC } = useTotalPoolData(objUSDC);
  const objcrvUSD = POOL_CONFIG_MAP[chainId]["crvUSD"];
  const { priceFeedData: priceFeedDatacrvUSD } = usePriceFeedData(objcrvUSD);
  const { totalPoolData: totalPoolDatacrvUSD } = useTotalPoolData(objcrvUSD);
  const objWETH = POOL_CONFIG_MAP[chainId]["WETH"];
  const { priceFeedData: priceFeedDataWETH } = usePriceFeedData(objWETH);
  const { totalPoolData: totalPoolDataWETH } = useTotalPoolData(objWETH);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (!priceObject["CJPY"] && priceFeedDataCJPY) {
      updatePriceFeedData("CJPY", priceFeedDataCJPY);
    }
  }, [priceFeedDataCJPY, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (!totalPoolObject["CJPY"] && totalPoolDataCJPY) {
      updateTotalPoolData("CJPY", totalPoolDataCJPY);
    }
  }, [totalPoolDataCJPY, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (!priceObject["USDC"] && priceFeedDataUSDC) {
      updatePriceFeedData("USDC", priceFeedDataUSDC);
    }
  }, [priceFeedDataUSDC, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (!totalPoolObject["USDC"] && totalPoolDataUSDC) {
      updateTotalPoolData("USDC", totalPoolDataUSDC);
    }
  }, [totalPoolDataUSDC, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (!priceObject["crvUSD"] && priceFeedDatacrvUSD) {
      updatePriceFeedData("crvUSD", priceFeedDatacrvUSD);
    }
  }, [priceFeedDatacrvUSD, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (!totalPoolObject["crvUSD"] && totalPoolDatacrvUSD) {
      updateTotalPoolData("crvUSD", totalPoolDatacrvUSD);
    }
  }, [totalPoolDatacrvUSD, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (!priceObject["WETH"] && priceFeedDataWETH) {
      updatePriceFeedData("WETH", priceFeedDataWETH);
    }
  }, [priceFeedDataWETH, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (!totalPoolObject["WETH"] && totalPoolDataWETH) {
      updateTotalPoolData("WETH", totalPoolDataWETH);
    }
  }, [totalPoolDataWETH, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    if (address) setIsReady(true);
  }, [address]);

  return (
    <>
      {isMobile ? (
        <DashboardBox
          width="100%"
          height="100%"
          mt={4}
          p={4}
          fontSize="lm"
          fontWeight="bold"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            pb={1}
          >
            <Heading size="md" px={4} py={3}>
              {t("Pool Lists")}
            </Heading>
            <ModalDivider />
            {isReady && <RenderPoolTableRow/>}
            {!isReady && <RenderPoolTableRow/>}
          </Column>
        </DashboardBox>
      ) : (
        <DashboardBox
          width="100%"
          height="100%"
          mt={4}
          p={4}
          fontSize="lm"
          fontWeight="bold"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            pb={1}
          >
            <Heading size="md" px={4} py={3}>
              {t("Pool Lists")}
            </Heading>
            <ModalDivider />
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
              height="50px"
              px={4}
              my={4}
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "10%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Pool Name")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width="30%"
              >
                <Text width="40%" fontWeight="bold" pl={1}>
                  {t("Base Asset")}
                </Text>
                <Text width="60%" fontWeight="bold" pl={1}>
                  {t("Collateral Asset")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Supply Balance")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Borrow Balance")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Collateral Balance")}
                </Text>
              </Row>
            </Row>
            <ModalDivider />
            {isReady && <RenderPoolTableRow/>}
            {!isReady && <RenderPoolTableRow/>}
            <ModalDivider />
          </Column>
        </DashboardBox>
      )}
    </>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

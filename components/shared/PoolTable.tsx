import React, { memo, useEffect } from "react";
import { Avatar, Spinner } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, Center, useIsMobile } from "utils/chakraUtils";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { useChainPool } from "hooks/useChainPool";
import { useReload } from "context/ReloadContext";
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
import { CurrencyProvider } from "components/Provider/currencyProvider";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

const PoolTable = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();

  const tokenData = poolData.baseToken;
  const symbol = tokenData?.symbol ?? "";
  const collateralList = poolData.assetConfigs;

  const isMobile = useIsMobile();
  const { chainId, poolName } = useChainPool();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

  return (
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
            crossAxisAlignment="flex-start"
            width="40%"
          >
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                mb={1}
              >
                <Text textAlign="center" fontWeight="bold" pl={1}>
                  {t("Pool Assets")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
              >
                <Text width="25%" fontWeight="bold" pl={1}>
                  {t("Base Asset")}
                </Text>
                <Text width="75%" fontWeight="bold" pl={1}>
                  {t("Collateral Asset")}
                </Text>
              </Row>
            </Column>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
              {t("Total {{symbol}} Supply Balance", { symbol })}
            </Text>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
              {t("Total {{symbol}} Borrow Balance", { symbol })}
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
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          px={4}
          pt={4}
          pb={2}
          className="hover-row"
          as="button"
          style={{ pointerEvents: address ? "auto" : "none" }}
        >
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            width="40%"
          >
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
              >
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  width="25%"
                  ml={1}
                >
                  <Avatar
                    bg="#FFF"
                    boxSize="30px"
                    name={symbol}
                    src={
                      tokenData?.logoURL ??
                      "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                    }
                  />
                </Row>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                  width="75%"
                >
                  {collateralList.map((asset, index) => {
                    return (
                      <Avatar
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                  {collateralList.map((asset, index) => {
                    return (
                      <Avatar
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                  {collateralList.map((asset, index) => {
                    return (
                      <Avatar
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                </Row>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                mt={1}
              >
                <Text fontWeight="bold" pl={1}>
                  {symbol} {"Pool"}
                </Text>
              </Row>
            </Column>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
              20
            </Text>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
              20
            </Text>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
              20
            </Text>
          </Row>
        </Row>
        <ModalDivider />
        {/* <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          px={4}
          pt={4}
          className="hover-row"
          as="button"
          style={{ pointerEvents: address ? "auto" : "none" }}
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            width="100%"
          >
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width={isMobile ? "33%" : "10%"}
                ml={1}
              >
                <Avatar
                  bg="#FFF"
                  boxSize="30px"
                  name={symbol}
                  src={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                />
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                overflow="scroll"
                width={isMobile ? "33%" : "30%"}
              >
                {collateralList.map((asset, index) => {
                  return (
                    <Avatar
                      bg="#FFF"
                      boxSize="30px"
                      mr={1}
                      name={asset?.symbol ?? ""}
                      src={
                        asset?.logoURL ??
                        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                      }
                    />
                  );
                })}
                {collateralList.map((asset, index) => {
                  return (
                    <Avatar
                      bg="#FFF"
                      boxSize="30px"
                      mr={1}
                      name={asset?.symbol ?? ""}
                      src={
                        asset?.logoURL ??
                        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                      }
                    />
                  );
                })}
                {collateralList.map((asset, index) => {
                  return (
                    <Avatar
                      bg="#FFF"
                      boxSize="30px"
                      mr={1}
                      name={asset?.symbol ?? ""}
                      src={
                        asset?.logoURL ??
                        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                      }
                    />
                  );
                })}
              </Row>
              <Text width="20%" textAlign="center" fontWeight="bold">
                {t("Total Collateral Balance")}
              </Text>
              <Text width="20%" textAlign="center" fontWeight="bold">
                {t("Total Collateral Balance")}
              </Text>
              <Text width="20%" textAlign="center" fontWeight="bold">
                {t("Total Collateral Balance")}
              </Text>
            </Row>
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
              my={2}
            >
              <Text pl={1}>
                {symbol} {"Pool"}
              </Text>
            </Row>
          </Column>
        </Row> */}
        {/* <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          mb={2}
        >
          <Text width={isMobile ? "33%" : "20%"} fontWeight="bold" pl={1}>
            {symbol} {"Pool"}
          </Text>
        </Row> */}
        <ModalDivider />
      </Column>
    </DashboardBox>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

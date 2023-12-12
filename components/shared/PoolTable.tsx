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
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import PoolTableRow from "components/shared/PoolTableRow";

const PoolTable = ({ poolData }: { poolData: PoolConfig[] }) => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();

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
                        mb={2}
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
                {poolData?.map((data, index) => {
                  return <PoolTableRow poolData={data} />;
                })}
                <ModalDivider />
              </Column>
            </DashboardBox>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

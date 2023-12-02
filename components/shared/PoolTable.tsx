import React, { memo, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
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

const PoolTable = memo(() => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();
  const { chainId, poolName } = useChainPool();

  const poolData = usePoolData();

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
        px={4}
        mt={4}
        >
          <Text width={isMobile ? "33%" : "20%"} fontWeight="bold" pl={1}>
            {t("Pool Assets")}
          </Text>
        </Row>
        <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={4}
      >
        <Text width={isMobile ? "33%" : "10%"} fontWeight="bold" pl={1}>
          {t("Base Asset")}
        </Text>
        <Text
          width={isMobile ? "33%" : "30%"}
          fontWeight="bold"
          pl={1}
        >
          {t("Collateral Asset")}
        </Text>
        <Text
          width={isMobile ? "33%" : "20%"}
          textAlign="center"
          fontWeight="bold"
          pl={1}
        >
          {t("Total {{symbol}} Supply Balance")}
        </Text>

        {!isMobile && (
          <>
            <Text width="20%" textAlign="center" fontWeight="bold">
              {t("Total {{symbol}} Borrow Balance")}
            </Text>
            <Text width="20%" textAlign="center" fontWeight="bold">
              {t("Total Collateral Balance")}
            </Text>
          </>
        )}
      </Row>
      </Column>
    </DashboardBox>
  );
});

PoolTable.displayName = "PoolTable";

export default PoolTable;

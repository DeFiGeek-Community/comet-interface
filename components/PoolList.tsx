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
import { Column, Center, useIsMobile } from "utils/chakraUtils";
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
import Link from 'next/link'
import { useTranslation } from "react-i18next";

const PoolList = memo(() => {
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
            <StatsBar poolData={poolData} isPoolList={true} />
            <DashboardBox
              width="100%"
              height="100%"
              mt={4}
              p={4}
              fontSize="lm"
              fontWeight="bold"
            >
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>Pool List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th colSpan={2} rowSpan={2} borderBottomWidth={0}>Pool Assets</Th>
                      {/* <Th>ベース資産</Th>
                      <Th>担保資産</Th> */}
                      <Th borderBottomWidth={0}></Th>
                      <Th borderBottomWidth={0}></Th>
                      <Th borderBottomWidth={0}></Th>
                    </Tr>
                  </Thead>
                  <Thead>
                    <Tr>
                      <Th>{t("Base Asset")}</Th>
                      <Th>{t("Collateral Asset")}</Th>
                      <Th isNumeric>{t("Total {{symbol}} Supply Balance")}</Th>
                      <Th isNumeric>{t("Total {{symbol}} Borrow Balance")}</Th>
                      <Th isNumeric>{t("Total Collateral Balance")}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* <Tr>
                      <Td>ベース資産</Td>
                      <Td>担保資産</Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                    </Tr> */}
                    <Tr>
                      <Td >CJPY Pool</Td>
                      <Td >CJPY Pool</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>30.48</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>0.91444</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                    <Th colSpan={2}>Pool Assets</Th>
                      <Th isNumeric>Total Supply Balance</Th>
                      <Th isNumeric>Total Borrow Balance</Th>
                      <Th isNumeric>Collateral Total Balance</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </DashboardBox>
            <Footer />
          </Column>
        </PoolSecondaryDataProvider>
      </CurrencyProvider>
    </PoolPrimaryDataProvider>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

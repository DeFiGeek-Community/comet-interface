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

const PoolList = memo(() => {
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
                      <Th>Pool Assets</Th>
                      <Th isNumeric>Total Supply Balance</Th>
                      <Th isNumeric>Total Borrow Balance</Th>
                      <Th isNumeric>Collateral Total Balance</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>CJPY Pool</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>30.48</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>⭕️⭕️⭕️⭕️</Td>
                      <Td isNumeric>25.4</Td>
                      <Td isNumeric>0.91444</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Pool Assets</Th>
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

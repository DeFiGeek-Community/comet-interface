import React, { memo, useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { useChainPool } from "hooks/useChainPool";
import { useReload } from "context/ReloadContext";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import { PoolSecondaryDataProvider } from "components/Provider/PoolSecondaryDataProvider";
import StatsBar from "components/pool/StatsBar";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import { CurrencyProvider } from "components/Provider/currencyProvider";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PoolTable from "components/shared/PoolTable";
import { useNetwork } from "wagmi";
import { POOL_CONFIG_MAP, SupportedPoolName } from "constants/pools";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import PoolTableRow from "components/shared/PoolTableRow";

import { Avatar} from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import { Row, } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { ModalDivider } from "components/shared/Modal";

export interface TotalCollateralData {
  [key: string]: number | undefined;
}
export interface TotalPoolData {
  totalBaseSupplyBalance: number | undefined;
  totalBaseBorrowBalance: number | undefined;
  totalCollateralBalances: TotalCollateralData;
  a: bigint | undefined;
}

const PoolList = memo(() => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();
  const { chain } = useNetwork();

  const [poolConfig, setPoolConfig] = useState<PoolConfig[] | undefined>();
  let config:PoolConfig[] = [];
  let testArray:TotalPoolData[] = [];
  useEffect(() => {
    if (chain) {
      const allPoolName = SupportedPoolName[chain?.id];
      //console.log(Object.keys(abc).length);
      for (let key in allPoolName) {
        config.push(POOL_CONFIG_MAP[chain?.id][key]);
      }
      // for(let i = 0; i < config.length; i++){
      //   const { totalPoolData, error } = useTotalPoolData(config[i]);
      //   if(totalPoolData) testArray.push(totalPoolData);
      // }
      console.log(config);
      setPoolConfig(config);
      //console.log(testArray);
    }
  }, [chain]);

  const poolData = usePoolData();

  const { address } = useAccount();
  const { reload } = useReload();

  const [chainId, setChainId] = useState<number>(chain?.id || 1);

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

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
            {/* {poolData ? (
              <PoolTable poolData={poolData} />
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )} */}
            {/* {poolConfig?.map((asset, index) => {
              return (<PoolTable poolData={asset} />);
            })} */}
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
            全預入残高{/* {t("Total {{symbol}} Supply Balance", { symbol })} */}
            </Text>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
            全借入残高{/* {t("Total {{symbol}} Borrow Balance", { symbol })} */}
            </Text>
          </Row>
          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            height="100%"
            width={isMobile ? "33%" : "20%"}
          >
            <Text textAlign="center" fontWeight="bold">
            全担保価値{/* {t("Total Collateral Balance")} */}
            </Text>
          </Row>
        </Row>
        <ModalDivider />
          {poolConfig?.map((asset, index) => {
            return (<PoolTableRow poolData={asset} />);
          })}
        <ModalDivider />
      </Column>
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

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

const PoolList = memo(() => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();
  const { chain } = useNetwork();

  const [poolConfig, setPoolConfig] = useState<PoolConfig[] | undefined>();
  let config:PoolConfig[] = [];
  useEffect(() => {
    if (chain) {
      const abc = SupportedPoolName[chain?.id];
      //console.log(Object.keys(abc).length);
      for (let key in abc) {
        config.push(POOL_CONFIG_MAP[chain?.id][key]);
      }
      console.log(config);
      setPoolConfig(config);
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
            {poolData ? (
              <PoolTable poolData={poolData} />
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )}
            <Footer />
          </Column>
        </PoolSecondaryDataProvider>
      </CurrencyProvider>
    </PoolPrimaryDataProvider>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;
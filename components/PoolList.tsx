import React, { memo, useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Column, Center, useIsMobile } from "utils/chakraUtils";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import { useReload } from "context/ReloadContext";
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
  let config: PoolConfig[] = [];
  useEffect(() => {
    if (chain) {
      const allPoolName = SupportedPoolName[chain?.id];
      for (let key in allPoolName) {
        const tempolaryConfig: PoolConfig = POOL_CONFIG_MAP[chain?.id][key];
        if (tempolaryConfig) config.push(tempolaryConfig);
      }
      setPoolConfig(config);
    }
  }, [chain]);

  const poolData = usePoolData();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

  return (
    <CurrencyProvider>
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        color="#FFFFFF"
        mx="auto"
        width={isMobile ? "100%" : "1150px"}
        px={isMobile ? 4 : 0}
      >
        <Header />
        <StatsBar isPoolList={true} />
        <PoolTable poolData={poolConfig} />
        <Footer />
      </Column>
    </CurrencyProvider>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

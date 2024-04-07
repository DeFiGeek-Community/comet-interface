import React, { useEffect, memo } from "react";
import { Column, useIsMobile } from "utils/chakraUtils";
import StatsBarForPoolList from "components/pool/StatsBarForPoolList";
import Footer from "components/shared/Footer";
import { Header } from "components/shared/Header";
import PoolTable from "components/list/PoolTable";
import { useAccount } from "wagmi";
import { useReload } from "context/ReloadContext";
import usePoolConfigForPoolList from "hooks/pool/list/usePoolConfigForPoolList";
import { PoolListDataProvider } from "components/Provider/PoolListDataProvider";
import { ChainForPoolListProvider } from "components/Provider/ChainForPoolListProvider";

const PoolList = memo(() => {
  const isMobile = useIsMobile();
  const { address } = useAccount();
  const { reload } = useReload();
  // const { poolConfigs } = usePoolConfigForPoolList();
  // console.log(poolDatas);

  useEffect(() => {
    reload();
  }, [address, reload]);

  return (
    // <ChainForPoolListProvider chainId={chainId}>
    //   <PoolListDataProvider poolDatas={poolConfigs}>
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      color="#FFFFFF"
      mx="auto"
      width={isMobile ? "100%" : "1150px"}
      px={isMobile ? 4 : 0}
    >
      <Header />
      <StatsBarForPoolList />
      <PoolTable />
      <Footer />
    </Column>
    //   </PoolListDataProvider>
    // </ChainForPoolListProvider>
  );
});

PoolList.displayName = "PoolList";

export default PoolList;

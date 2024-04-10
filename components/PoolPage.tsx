import { Spinner } from "@chakra-ui/react";
import { Center } from "utils/chakraUtils";
import { usePool } from "context/PoolContext";
import { PoolPrimaryDataProvider } from "components/Provider/PoolPrimaryDataProvider";
import { PoolSecondaryDataProvider } from "components/Provider/PoolSecondaryDataProvider";
import StatsBar from "components/pool/StatsBar";
import CollateralRatioBar from "components/pool/CollateralRatioBar";
import BaseList from "components/pool/BaseList";
import CollateralList from "components/pool/CollateralList";
import ClaimReward from "components/pool/ClaimReward";
import DashboardBox from "components/shared/DashboardBox";

const PoolContents = () => {
  const { poolConfig: poolData } = usePool();

  return (
    <PoolPrimaryDataProvider poolData={poolData}>
      <PoolSecondaryDataProvider poolData={poolData}>
        {/* <TabBar /> */}
        <StatsBar poolData={poolData} isPoolList={false} />
        <CollateralRatioBar poolData={poolData} />

        <DashboardBox mt={4} width={"100%"}>
          {poolData ? (
            <BaseList poolData={poolData} />
          ) : (
            <Center height="200px">
              <Spinner />
            </Center>
          )}
        </DashboardBox>

        <DashboardBox ml={0} mt={4} width={"100%"}>
          {poolData ? (
            <CollateralList poolData={poolData} />
          ) : (
            <Center height="200px">
              <Spinner />
            </Center>
          )}
        </DashboardBox>
        <DashboardBox ml={0} mt={4} width={"100%"}>
          {poolData ? (
            <ClaimReward poolData={poolData} />
          ) : (
            <Center height="100px">
              <Spinner />
            </Center>
          )}
        </DashboardBox>
      </PoolSecondaryDataProvider>
    </PoolPrimaryDataProvider>
  );
};

PoolContents.displayName = "PoolContents";

export default PoolContents;

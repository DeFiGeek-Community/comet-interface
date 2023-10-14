import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Progress, Text, Spinner } from "@chakra-ui/react";
import { Row, Center } from "utils/chakraUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import { usePoolPrimaryDataContext } from "hooks/usePoolPrimaryDataContext";
import usePositionSummary from "hooks/pool/indivisual/usePositionSummary";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { PoolConfig } from "interfaces/pool";

const CollateralRatioBar = ({ poolData }: { poolData?: PoolConfig }) => {
  const { t } = useTranslation();
  const { baseAssetData } = usePoolPrimaryDataContext();
  const { positionSummary } = usePositionSummary(poolData);

  return (
    <DashboardBox width="100%" height="65px" mt={4} p={4}>
      {baseAssetData && positionSummary ? (
        <Row mainAxisAlignment="flex-start" crossAxisAlignment="center" expand>
          <SimpleTooltip
            label={t(
              "Keep this bar from filling up to avoid being liquidated!",
            )}
          >
            <Text flexShrink={0} mr={4}>
              {t("Liquidation Limit")}
            </Text>
          </SimpleTooltip>

          <SimpleTooltip label={t("This is how much you have borrowed.")}>
            <Text flexShrink={0} mt="2px" mr={3} fontSize="10px">
              {smallUsdFormatter(baseAssetData?.yourBorrow ?? 0)}
            </Text>
          </SimpleTooltip>

          <SimpleTooltip
            label={`You're using ${
              positionSummary.LiquidationPercentage
            }% of your ${smallUsdFormatter(
              positionSummary?.LiquidationPoint ?? 0,
            )} Liquidation limit.`}
          >
            <Box width="100%">
              <Progress
                size="xs"
                width="100%"
                colorScheme={"whatsapp"}
                borderRadius="10px"
                value={positionSummary.LiquidationPercentage}
              />
            </Box>
          </SimpleTooltip>

          <SimpleTooltip
            label={t(
              "If your borrow amount reaches this value, you will be liquidated.",
            )}
          >
            <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
              {smallUsdFormatter(positionSummary?.LiquidationPoint ?? 0)}
            </Text>
          </SimpleTooltip>
        </Row>
      ) : (
        <Center height="30px">
          <Spinner />
        </Center>
      )}
    </DashboardBox>
  );
};

export default CollateralRatioBar;

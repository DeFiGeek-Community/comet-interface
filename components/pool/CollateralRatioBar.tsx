import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Progress, Text, Spinner } from "@chakra-ui/react";
import { Row, Center } from "utils/chakraUtils";
import { toNumber, truncateTo2DecimalPlaces } from "utils/bigUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import { usePoolSecondaryDataContext } from "hooks/pool/usePoolSecondaryDataContext";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import StatusBar from "components/pool/StatusBar";

const CollateralRatioBar = ({ poolData }: { poolData?: PoolConfig }) => {
  const { t } = useTranslation();
  const { currency, rate } = useAppData();
  const { baseAssetData, priceFeedData } = usePoolPrimaryDataContext();
  const { positionSummary } = usePoolSecondaryDataContext();
  const basePrice = priceFeedData?.baseAsset ?? 0;
  const baseDecimals = poolData?.baseToken.decimals ?? 0;
  const yourBorrow = toNumber(baseAssetData?.yourBorrow, baseDecimals);
  const yourBorrowUSD = yourBorrow * basePrice;
  const liquidationPoint = positionSummary?.liquidationPointUSD ?? 0;
  let liquidationPercentage = (yourBorrowUSD / liquidationPoint) * 100 || 0;
  const colorScheme =
    liquidationPercentage > 90
      ? "red"
      : liquidationPercentage > 80
        ? "orange"
        : "whatsapp";
  const tooltipMessage = t("tooltipMessage", {
    liquidationPercentage: truncateTo2DecimalPlaces(liquidationPercentage),
    liquidationPoint: smallUsdFormatter(liquidationPoint, currency, rate || 0),
  });
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
              {smallUsdFormatter(yourBorrowUSD, currency, rate || 0)}
            </Text>
          </SimpleTooltip>

          <SimpleTooltip label={tooltipMessage}>
            <Box width="100%">
              {/* <Progress
                size="xs"
                width="100%"
                colorScheme={colorScheme}
                borderRadius="10px"
                value={liquidationPercentage}
              /> */}
              <StatusBar
                success={65}
                warning={20}
                danger={15}
                striped={true}
                animated={true}
                lightened={false}
                overlay={{ value: 50, color: '#4caf50' }}
              />
            </Box>
          </SimpleTooltip>

          <SimpleTooltip
            label={t(
              "If your borrow amount reaches this value, you will be liquidated.",
            )}
          >
            <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
              {smallUsdFormatter(liquidationPoint, currency, rate || 0)}
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

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Row, useIsMobile } from "utils/chakraUtils";
import { toNumber, truncateTo2DecimalPlaces } from "utils/bigUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import usePoolData from "hooks/pool/usePoolData";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import StatusBar from "components/pool/StatusBar";
import StatusBarGray from "components/pool/StatusBarGray";
import {
  AllRatio,
  DangerRatio,
  BorrowCapacityUSDLeewayRatio,
  LiquidationDangerRatio,
  GreenColorCode,
  YellowColorCode,
  RedColorCode,
  LightRedColorCode,
  WhiteColorCode,
} from "constants/ratio";

const CollateralRatioBar = ({ poolData }: { poolData?: PoolConfig }) => {
  const { t } = useTranslation();
  const { address } = useAccount();
  const isMobile = useIsMobile();
  const { currency, rate } = useAppData();
  const { baseAssetData, priceFeedData, positionSummary } = usePoolData();
  const basePrice = priceFeedData?.baseAsset ?? 0;
  const baseDecimals = poolData?.baseToken.decimals ?? 0;
  const yourBorrow = toNumber(baseAssetData?.yourBorrow, baseDecimals);
  const yourBorrowUSD = yourBorrow * basePrice;
  const liquidationPoint = positionSummary?.liquidationPointUSD ?? 0;
  let liquidationPercentage = (yourBorrowUSD / liquidationPoint) * 100 || 0;

  const [isLabelOpen, setIsLabelOpen] = useState(false);
  const [leeway, setLeeway] = useState(0);
  const [warning, setWarning] = useState(0);
  const [colorScheme, setColorScheme] = useState("");
  const [hasCollateral, setHasCollateral] = useState(false);
  useEffect(() => {
    if (!positionSummary?.borrowCapacityUSD) return;

    let tempLeeway = truncateTo2DecimalPlaces(
      ((positionSummary?.borrowCapacityUSD * BorrowCapacityUSDLeewayRatio) /
        liquidationPoint) *
        100,
    );
    setLeeway(tempLeeway);
    let tempWarning = truncateTo2DecimalPlaces(
      AllRatio - tempLeeway - DangerRatio,
    );
    setWarning(tempWarning);
  }, [positionSummary?.borrowCapacityUSD]);
  useEffect(() => {
    if (yourBorrow < 0) return;

    if (liquidationPercentage >= LiquidationDangerRatio) {
      setColorScheme(RedColorCode);
    } else if (
      leeway <= liquidationPercentage &&
      liquidationPercentage < LiquidationDangerRatio
    ) {
      setColorScheme(YellowColorCode);
    } else {
      setColorScheme(GreenColorCode);
    }
  }, [yourBorrow, liquidationPercentage, leeway]);
  useEffect(() => {
    setHasCollateral(
      positionSummary?.collateralBalanceUSD ? (address ? true : false) : false,
    );
  }, [positionSummary?.collateralBalanceUSD, address]);

  const tooltipMessage = t("tooltipMessage", {
    liquidationPercentage: truncateTo2DecimalPlaces(liquidationPercentage),
    liquidationPoint: smallUsdFormatter(liquidationPoint, currency, rate || 0),
  });
  const tooltipMessageMobile = t("tooltipMessageMobile", {
    yourBorrowUSD: smallUsdFormatter(yourBorrowUSD, currency, rate || 0),
    liquidationPercentage: truncateTo2DecimalPlaces(liquidationPercentage),
  });

  return (
    <DashboardBox width="100%" height="65px" mt={4} p={4}>
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center" expand>
        <SimpleTooltip
          label={t("Keep this bar from filling up to avoid being liquidated!")}
        >
          <Text
            flexShrink={isMobile ? 1 : 0}
            fontSize={isMobile ? "12px" : "15px"}
            mr={isMobile ? 2 : 4}
          >
            {isMobile ? t("Limit") : t("Liquidation Limit")}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip label={t("This is how much you have borrowed.")}>
          <Text flexShrink={0} mt="2px" mr={3} fontSize="10px">
            {smallUsdFormatter(yourBorrowUSD, currency, rate || 0)}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip
          label={isMobile ? tooltipMessageMobile : tooltipMessage}
          isOpen={isMobile ? isLabelOpen : undefined}
        >
          <Box width="100%" onClick={() => setIsLabelOpen(!isLabelOpen)}>
            {baseAssetData && positionSummary && hasCollateral ? (
              <StatusBar
                leeway={leeway}
                warning={warning}
                overlay={{
                  value: truncateTo2DecimalPlaces(liquidationPercentage),
                  color: colorScheme,
                }}
              />
            ) : (
              <StatusBarGray />
            )}
          </Box>
        </SimpleTooltip>

        <SimpleTooltip
          label={t(
            "If your borrow amount reaches this value, you will be liquidated.",
          )}
        >
          <>
            {isMobile ? (
              <Flex flexDirection="column">
                <Text
                  flexShrink={0}
                  mt="2px"
                  ml={3}
                  fontSize={isMobile ? "12px" : "15px"}
                  color={hasCollateral ? LightRedColorCode : WhiteColorCode}
                >
                  {t("Liquidation")}
                </Text>
                <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
                  {smallUsdFormatter(liquidationPoint, currency, rate || 0)}
                </Text>
              </Flex>
            ) : (
              <>
                <Text
                  flexShrink={0}
                  mt="2px"
                  ml={3}
                  fontSize={isMobile ? "12px" : "15px"}
                  color={hasCollateral ? LightRedColorCode : WhiteColorCode}
                >
                  {t("Liquidation")}
                </Text>
                <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
                  {smallUsdFormatter(liquidationPoint, currency, rate || 0)}
                </Text>
              </>
            )}
            {/* <Text
              flexShrink={0}
              mt="2px"
              ml={3}
              fontSize={isMobile?"12px":"15px"}
              color={hasCollateral ? LightRedColorCode : WhiteColorCode}
            >
              {t("Liquidation")}
            </Text>
            <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
              {smallUsdFormatter(liquidationPoint, currency, rate || 0)}
            </Text> */}
          </>
        </SimpleTooltip>
      </Row>
    </DashboardBox>
  );
};

export default CollateralRatioBar;

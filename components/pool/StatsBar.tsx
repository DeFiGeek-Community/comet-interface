import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { RowOrColumn, Column, Center, Row } from "utils/chakraUtils";
import {
  smallUsdFormatter,
  smallUsdPriceFormatter,
  formatUsdWithFourDecimals,
} from "utils/bigUtils";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import CaptionedStat from "components/shared/CaptionedStat";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { PoolConfig } from "interfaces/pool";
import { useCurrency } from "context/currencyContext";

const StatsBar = ({
  poolData,
  isPoolList,
}: {
  poolData?: PoolConfig;
  isPoolList?: boolean;
}) => {
  const isMobile = useIsSmallScreen();
  const symbol = poolData?.baseToken.symbol ?? "";
  const { priceFeedData, totalPoolData } = usePoolPrimaryDataContext();
  let totalCollateralUsdBalance;

  const collateralAssets = poolData?.assetConfigs ?? [];
  for (const assetConfig of collateralAssets) {
    const assetSymbol = assetConfig.symbol ?? "";
    const assetPrice = priceFeedData?.collateralAssets[assetSymbol];
    const assetBalance = totalPoolData?.totalCollateralBalances[assetSymbol];

    if (
      !totalPoolData?.totalCollateralBalances ||
      assetBalance === undefined ||
      assetPrice === undefined
    ) {
      totalCollateralUsdBalance = undefined;
      break;
    }

    totalCollateralUsdBalance =
      (totalCollateralUsdBalance ?? 0) + assetPrice * assetBalance;
  }

  const { t } = useTranslation();
  const { currency, rate } = useCurrency();

  return (
    <RowOrColumn
      width="100%"
      isRow={!isMobile}
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height={isMobile ? "auto" : "170px"}
    >
      <DashboardBox
        width={isMobile ? "100%" : isPoolList ? "100%" : "50%"}
        height={isMobile ? "auto" : "100%"}
      >
        <Column
          expand
          mainAxisAlignment="center"
          crossAxisAlignment={isMobile ? "center" : "flex-start"}
          textAlign={isMobile ? "center" : "left"}
          p={4}
          fontSize="sm"
        >
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            mb="2px"
          >
            {/* Title */}
            <WhitelistedIcon mb={1} />
            {isPoolList ? (
              <Heading size="lg" isTruncated>
                
                  punodwoɔ
              </Heading>
            ) : (
              <Heading size="lg" isTruncated>
                {symbol} {"Pool"}
              </Heading>
            )}
          </Row>

          {/* Description */}
          <Text>{t("punodwoɔ is a truly open interest rate protocol.")}</Text>
        </Column>
      </DashboardBox>

      {!isPoolList && (
        <RowOrColumn
          isRow={!isMobile}
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          height="100%"
          width={isMobile ? "100%" : "50%"}
        >
          <RowOrColumn
            isRow={false}
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            width={isMobile ? "100%" : "60%"}
          >
            <StatBox mb={!isMobile && 2} width={isMobile ? "100%" : "98%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize={isMobile ? "3xl" : "2xl"}
                captionSize="sm"
                stat={
                  totalPoolData?.totalBaseSupplyBalance !== undefined &&
                  priceFeedData?.baseAsset !== undefined
                    ? smallUsdPriceFormatter(
                        totalPoolData?.totalBaseSupplyBalance,
                        priceFeedData.baseAsset,
                        currency,
                        rate || 0,
                      )
                    : "$ ?"
                }
                caption={t("Total {{symbol}} Supply Balance", { symbol })}
              />
            </StatBox>
            <StatBox width={isMobile ? "100%" : "98%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize={isMobile ? "3xl" : "2xl"}
                captionSize="sm"
                stat={
                  totalCollateralUsdBalance !== undefined
                    ? smallUsdFormatter(
                        totalCollateralUsdBalance,
                        currency,
                        rate || 0,
                      )
                    : "$ ?"
                }
                caption={t("Total Collateral Balance")}
              />
            </StatBox>
          </RowOrColumn>

          <RowOrColumn
            isRow={false}
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            width={isMobile ? "100%" : "60%"}
          >
            <StatBox mb={!isMobile && 2} width={isMobile ? "100%" : "98%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize={isMobile ? "3xl" : "2xl"}
                captionSize="sm"
                stat={
                  totalPoolData?.totalBaseBorrowBalance !== undefined &&
                  priceFeedData?.baseAsset !== undefined
                    ? smallUsdPriceFormatter(
                        totalPoolData.totalBaseBorrowBalance,
                        priceFeedData.baseAsset,
                        currency,
                        rate || 0,
                      )
                    : "$ ?"
                }
                caption={t("Total {{symbol}} Borrow Balance", { symbol })}
              />
            </StatBox>
            <StatBox width={isMobile ? "100%" : "98%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize={isMobile ? "3xl" : "2xl"}
                captionSize="sm"
                stat={
                  priceFeedData?.baseAsset !== undefined
                    ? formatUsdWithFourDecimals(
                        priceFeedData?.baseAsset,
                        currency,
                        rate || 0,
                      )
                    : "$ ?"
                }
                caption={t("Base Token Oracle Price")}
              />
            </StatBox>
          </RowOrColumn>
        </RowOrColumn>
      )}
    </RowOrColumn>
  );
};

export default StatsBar;

const StatBox = ({
  children,
  ...others
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const isMobile = useIsSmallScreen();

  return (
    <DashboardBox
      height={isMobile ? "auto" : "100%"}
      mt={isMobile ? 4 : 0}
      ml={isMobile ? 0 : 2}
      {...others}
    >
      <Center expand p={1}>
        {children}
      </Center>
    </DashboardBox>
  );
};

export const WhitelistedIcon = ({ ...boxProps }: { [x: string]: any }) => {
  return (
    <>
      <SimpleTooltip label={"This pool is safe."} placement="bottom-end">
        <CheckCircleIcon boxSize="20px" mr={3} {...boxProps} />
      </SimpleTooltip>
    </>
  );
};

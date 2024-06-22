import React, { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  Avatar,
  AvatarProps,
  Spinner,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { smallUsdFormatter, smallUsdPriceFormatter } from "utils/bigUtils";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import usePool from "hooks/pool/usePool";
import { Currency } from "context/AppDataContext";
import { ModalDivider } from "components/shared/Modal";
import HoverIcon from "components/shared/HoverIcon";
import { helpSvgUrl } from "constants/urls";
import {
  OneMillion,
  OneHundred,
  OffsetRatio,
  LightPinkColorCode,
  DarkGrayColorCode,
  LightBlackColorCode,
  DonutSize,
  NumberOfAvatarPerRow,
} from "constants/aprs";
import usePoolData from "hooks/pool/usePoolData";
import DonutChart from "components/list/DonutChart";

interface RenderAvatarProps extends Omit<AvatarProps, "name" | "src"> {
  isBaseAsset: boolean;
  name?: string;
  src?: string;
}

function RenderAvatar({ isBaseAsset, name, src, ...props }: RenderAvatarProps) {
  return (
    <Avatar
      bg="#FFF"
      boxSize={isBaseAsset ? "35px" : "20px"}
      name={name ?? ""}
      position="relative"
      zIndex="1"
      src={src ?? helpSvgUrl}
      {...props}
    />
  );
}

interface RenderBalanceTextProps {
  totalPoolObjectValue?: number;
  assetPrice?: number | null;
  currency: Currency;
  rate?: number;
  isCollateralBalances: boolean;
  text?: string;
}

const RenderBalanceText: React.FC<RenderBalanceTextProps> = ({
  totalPoolObjectValue,
  assetPrice,
  currency,
  rate = 0,
  isCollateralBalances,
  text,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // バランスの表示値を計算
  const formattedValue = React.useMemo(() => {
    if (totalPoolObjectValue === undefined || assetPrice === null || !address) {
      return <Spinner />;
    }

    const valueDevidedByOneMillion = totalPoolObjectValue / OneMillion;

    const valueFormatted = isCollateralBalances
      ? smallUsdFormatter(valueDevidedByOneMillion ?? 0, currency, rate)
      : smallUsdPriceFormatter(
          valueDevidedByOneMillion ?? 0,
          assetPrice ?? 0,
          currency,
          rate,
        );

    return valueFormatted + " M";
  }, [
    totalPoolObjectValue,
    assetPrice,
    currency,
    rate,
    isCollateralBalances,
    address,
  ]);

  return (
    <Row
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "12%"}
      pb={text ? (isCollateralBalances ? 1 : 6) : undefined}
    >
      {text && (
        <Text
          width={currentLanguage === "ja" ? "135px" : "auto"}
          textAlign="left"
          fontWeight="bold"
          mr={currentLanguage === "ja" ? 2 : 4}
        >
          {t(text)}
        </Text>
      )}
      <Text
        color="#FFF"
        fontWeight="bold"
        fontSize="17px"
        textAlign="center"
        as="div"
      >
        {formattedValue}
      </Text>
    </Row>
  );
};

interface RenderStatsTextProps {
  statsValue?: number;
  text?: string;
  hasDonut?: boolean;
  hovertext?: string;
}

const RenderStatsText: React.FC<RenderStatsTextProps> = ({
  statsValue,
  text,
  hasDonut,
  hovertext,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();

  const [isHovered, setIsHovered] = useState(false);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const formattedValue = React.useMemo(() => {
    if (statsValue === undefined || !address) {
      return <Spinner />;
    }

    const valueFormatted = statsValue.toFixed(2);

    return valueFormatted + " %";
  }, [statsValue, address]);

  const renderDonutChart = React.useMemo(() => {
    if (statsValue === undefined || !address) {
      return;
    }

    const rest = OneHundred - statsValue - OffsetRatio;

    const data = [statsValue, rest, OffsetRatio];
    const labels = ["Utilization", "Rest", "Offset"];
    const colors = [LightPinkColorCode, DarkGrayColorCode, LightBlackColorCode];

    return (
      <DonutChart
        data={data}
        labels={labels}
        colors={colors}
        size={DonutSize}
      />
    );
  }, [statsValue, address]);

  return (
    <Row
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "12%"}
      pb={text ? 6 : undefined}
    >
      {hasDonut && renderDonutChart}
      {text && (
        <Text
          width={currentLanguage === "ja" ? "135px" : "auto"}
          textAlign="left"
          fontWeight="bold"
          mr={currentLanguage === "ja" ? 2 : 4}
        >
          {t(text)}
        </Text>
      )}

      <Text
        color="#FFF"
        fontWeight="bold"
        fontSize="17px"
        textAlign="center"
        as="div"
      >
        {formattedValue}
      </Text>
      {!hasDonut && isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {hovertext}
        </Box>
      )}
    </Row>
  );
};

const PoolTableRow = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { address } = useAccount();

  const { currency, rate } = useAppData();
  const { navigateToPageClick } = usePool();

  const tokenData = poolData?.baseToken;
  const symbol = tokenData?.symbol ?? "";
  const collateralList = poolData?.assetConfigs;
  let allCollateralSymbols: string = "";
  if (collateralList) {
    for (const assetConfig of collateralList) {
      allCollateralSymbols += assetConfig.symbol + ", ";
    }
  }

  const { priceFeedData, baseAssetData, tokenRewardData, totalPoolData } =
    usePoolData();

  const assetPrice = priceFeedData?.baseAsset ?? null;

  let sumCollateralBalances = 0;

  for (let key in totalPoolData?.totalCollateralBalances) {
    const collateralBalance =
      totalPoolData?.totalCollateralBalances?.[key] ?? 0;
    const collateralAssetPrice = priceFeedData?.collateralAssets?.[key] ?? 0;
    const tempValue = collateralBalance * collateralAssetPrice;
    if (tempValue) {
      sumCollateralBalances += tempValue;
    }
  }
  let utilizationValue: number | undefined;
  if (
    totalPoolData?.totalBaseBorrowBalance &&
    totalPoolData?.totalBaseSupplyBalance
  ) {
    utilizationValue =
      (totalPoolData?.totalBaseBorrowBalance /
        totalPoolData?.totalBaseSupplyBalance) *
      OneHundred;
  } else if (totalPoolData?.totalBaseBorrowBalance === 0) {
    utilizationValue = 0;
  }

  let netEarnAPRValue: number | undefined;
  let hoverTextEarnAPR: string | undefined;
  let netBorrowAPRValue: number | undefined;
  let hoverTextBorrowAPR: string | undefined;
  if (
    baseAssetData?.supplyAPR !== undefined &&
    tokenRewardData?.supplyRewardAPR !== undefined
  ) {
    const supplyAPRPercent = baseAssetData?.supplyAPR * OneHundred;
    netEarnAPRValue = supplyAPRPercent + tokenRewardData?.supplyRewardAPR;
    hoverTextEarnAPR =
      t("Earn APR") +
      ": " +
      supplyAPRPercent.toFixed(2) +
      " % " +
      t("Supply Reward") +
      ": " +
      tokenRewardData?.supplyRewardAPR.toFixed(3) +
      " %";
  }
  if (
    baseAssetData?.borrowAPR !== undefined &&
    tokenRewardData?.borrowRewardAPR !== undefined
  ) {
    const borrowAPRPercent = baseAssetData?.borrowAPR * OneHundred;
    netBorrowAPRValue = borrowAPRPercent - tokenRewardData?.borrowRewardAPR;
    hoverTextBorrowAPR =
      t("Borrow APR") +
      ": " +
      borrowAPRPercent.toFixed(2) +
      " % " +
      t("Borrow Reward") +
      ": " +
      tokenRewardData?.borrowRewardAPR.toFixed(3) +
      " %";
  }

  return (
    <Link
      onClick={() => navigateToPageClick(symbol)}
      width="100%"
      whiteSpace="nowrap"
      className="no-underline"
      pointerEvents="auto"
    >
      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        py={4}
        backgroundColor={"gray.900"}
        className="hover-row"
        as="button"
        style={{ pointerEvents: address ? "auto" : "none" }}
      >
        {isMobile ? (
          <>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              height="100%"
              width="100%"
              pb={1}
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={4}
              >
                <Image src="/crown.png" alt="crown" height={20} width={20} />
                <Text textAlign="center" fontWeight="bold" size="md" pl={1}>
                  {symbol} {"Pool"}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={4}
              >
                <Text width="40%" textAlign="left" fontWeight="bold" pl={1}>
                  {t("Base Asset")}
                </Text>
                <Text width="60%" textAlign="left" fontWeight="bold" pl={1}>
                  {t("Collateral Asset")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                pb={6}
              >
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  width="40%"
                  pl={7}
                >
                  <RenderAvatar
                    isBaseAsset={true}
                    name={symbol}
                    src={tokenData?.logoURL}
                  />
                </Row>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                  width="60%"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <RenderAvatar
                        isBaseAsset={false}
                        name={asset?.symbol}
                        src={asset?.logoURL}
                        key={index}
                        mr={1}
                      />
                    );
                  })}
                </Row>
              </Row>
              <RenderBalanceText
                totalPoolObjectValue={totalPoolData?.totalBaseSupplyBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Supplied"}
              />
              <RenderBalanceText
                totalPoolObjectValue={totalPoolData?.totalBaseSupplyBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Borrowed"}
              />
              <RenderBalanceText
                totalPoolObjectValue={sumCollateralBalances}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={true}
                text={"Total Collateral"}
              />
            </Column>
          </>
        ) : (
          <>
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="16%"
            >
              <HoverIcon isBase={true} hoverText={symbol}>
                <Row
                  mainAxisAlignment="center"
                  crossAxisAlignment="center"
                  pl={6}
                >
                  <RenderAvatar
                    isBaseAsset={true}
                    name={symbol}
                    src={tokenData?.logoURL}
                  />
                  <Text textAlign="center" fontWeight="bold" pl={2}>
                    {symbol}
                  </Text>
                </Row>
              </HoverIcon>
            </Row>
            <RenderStatsText statsValue={utilizationValue} hasDonut={true} />
            <RenderStatsText
              statsValue={netEarnAPRValue}
              hovertext={hoverTextEarnAPR}
            />
            <RenderStatsText
              statsValue={netBorrowAPRValue}
              hovertext={hoverTextBorrowAPR}
            />
            <RenderBalanceText
              totalPoolObjectValue={totalPoolData?.totalBaseSupplyBalance}
              assetPrice={assetPrice}
              currency={currency}
              rate={rate}
              isCollateralBalances={false}
            />
            <RenderBalanceText
              totalPoolObjectValue={totalPoolData?.totalBaseSupplyBalance}
              assetPrice={assetPrice}
              currency={currency}
              rate={rate}
              isCollateralBalances={false}
            />
            <RenderBalanceText
              totalPoolObjectValue={sumCollateralBalances}
              assetPrice={assetPrice}
              currency={currency}
              rate={rate}
              isCollateralBalances={true}
            />
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              width="12%"
            >
              <HoverIcon isBase={false} hoverText={allCollateralSymbols}>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="flex-start"
                  flexWrap="wrap"
                  overflow="visible"
                  ml={0.5}
                  width="100%"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <RenderAvatar
                        isBaseAsset={false}
                        name={asset?.symbol}
                        src={asset?.logoURL}
                        key={index}
                        mr={index % NumberOfAvatarPerRow}
                        style={{
                          marginLeft:
                            (index % NumberOfAvatarPerRow) *
                            -NumberOfAvatarPerRow,
                          marginBottom: NumberOfAvatarPerRow,
                          width: "25%",
                        }}
                      />
                    );
                  })}
                </Row>
              </HoverIcon>
            </Row>
          </>
        )}
      </Row>
      <ModalDivider />
    </Link>
  );
};

PoolTableRow.displayName = "PoolTableRow";

export default PoolTableRow;

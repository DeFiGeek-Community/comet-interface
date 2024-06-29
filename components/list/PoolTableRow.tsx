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
  OneSextillionN,
  OneQuitillionN,
  OneQuadrillionN,
  OneTrillionN,
  OneBillionN,
  OneMillionN,
  OneThousandN,
  OneGaiN,
  OneKeiN,
  OneChouN,
  OneOkuN,
  OneManN,
  OneMillion,
  OneHundred,
  OffsetRatio,
  DarkGrayColorCode,
  LightBlackColorCode,
  DonutSize,
  NumberOfAvatarPerRow,
  NumberOfAvatarPerRowForMobile,
  OverlappingDegree,
  MarginRight,
} from "constants/aprs";
import { GreenColorCode, YellowColorCode, RedColorCode } from "constants/ratio";
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

  const flooredValue = React.useMemo(() => {
    if (totalPoolObjectValue !== undefined && assetPrice) {
      const flooredValue = Math.floor(
        (totalPoolObjectValue * assetPrice) / rate,
      );
      if (currency === "USD") {
        return "$" + flooredValue.toLocaleString();
      } else {
        return "¥" + flooredValue.toLocaleString();
      }
    } else {
      return undefined;
    }
  }, [totalPoolObjectValue, assetPrice, currency]);
  // バランスの表示値を計算
  const formattedValue = React.useMemo(() => {
    if (totalPoolObjectValue === undefined || assetPrice === null || !address) {
      return <Spinner />;
    }

    if (totalPoolObjectValue > Number.MAX_SAFE_INTEGER) {
      console.log(
        "It is possible that the values exceed the upper limit of what can be safely calculated in javascript, and therefore the values may not be calculated or displayed accurately.",
      );
    }

    const getFormattedValue = (
      totalPoolObjectValue: number,
      assetPrice: number | undefined,
      currency: Currency,
    ): string => {

      let divisor: bigint;

      const getRoundedNumber = (totalValue: string) => {
        if (currency === "USD") {
          if (BigInt(totalValue) < BigInt(OneThousandN)) {
            divisor = BigInt("1");
          } else if (
            BigInt(OneThousandN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneMillionN)
          ) {
            divisor = BigInt(OneThousandN);
          } else if (
            BigInt(OneMillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneBillionN)
          ) {
            divisor = BigInt(OneMillionN);
          } else if (
            BigInt(OneBillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneTrillionN)
          ) {
            divisor = BigInt(OneBillionN);
          } else if (
            BigInt(OneTrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuadrillionN)
          ) {
            divisor = BigInt(OneTrillionN);
          } else if (
            BigInt(OneQuadrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuitillionN)
          ) {
            divisor = BigInt(OneQuadrillionN);
          } else if (
            BigInt(OneQuitillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneSextillionN)
          ) {
            divisor = BigInt(OneQuitillionN);
          } else {
            divisor = BigInt(OneSextillionN);
          }
        } else if (currency === "JPY") {
          if (BigInt(totalValue) < BigInt(OneManN)) {
            divisor = BigInt("1");
          } else if (
            BigInt(OneManN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneOkuN)
          ) {
            divisor = BigInt(OneManN);
          } else if (
            BigInt(OneOkuN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneChouN)
          ) {
            divisor = BigInt(OneOkuN);
          } else if (
            BigInt(OneChouN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneKeiN)
          ) {
            divisor = BigInt(OneChouN);
          } else if (
            BigInt(OneKeiN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneGaiN)
          ) {
            divisor = BigInt(OneKeiN);
          } else {
            divisor = BigInt(OneGaiN);
          }
        }
        return BigInt(totalValue) / BigInt(divisor);
      };

      let flooredValue: number = 0;
      if (assetPrice) {
        flooredValue = Math.floor((totalPoolObjectValue * assetPrice) / rate);
      }

      const flooredNumber = String(flooredValue);

      const roundedFlooredNumber = getRoundedNumber(flooredNumber);

      let valueFormatted = "";
      if (currency === "USD") {
        valueFormatted = "$" + roundedFlooredNumber;
      } else {
        valueFormatted = "¥" + roundedFlooredNumber;
      }

      const getUnitText = (totalValue: string) => {
        if (currency === "USD") {
          if (BigInt(totalValue) < BigInt(OneThousandN)) {
            return "";
          } else if (
            BigInt(OneThousandN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneMillionN)
          ) {
            return "K";
          } else if (
            BigInt(OneMillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneBillionN)
          ) {
            return "M";
          } else if (
            BigInt(OneBillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneTrillionN)
          ) {
            return "B";
          } else if (
            BigInt(OneTrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuadrillionN)
          ) {
            return "T";
          } else if (
            BigInt(OneQuadrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuitillionN)
          ) {
            return "Qua";
          } else if (
            BigInt(OneQuitillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneSextillionN)
          ) {
            return "Qui";
          }
        } else if (currency === "JPY") {
          if (BigInt(totalValue) < BigInt(OneManN)) {
            return "";
          } else if (
            BigInt(OneManN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneOkuN)
          ) {
            return "万";
          } else if (
            BigInt(OneOkuN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneChouN)
          ) {
            return "億";
          } else if (
            BigInt(OneChouN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneKeiN)
          ) {
            return "兆";
          } else if (
            BigInt(OneKeiN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneGaiN)
          ) {
            return "京";
          } else {
            return "垓";
          }
        }
      };

      return  valueFormatted + getUnitText(flooredNumber);
    };

    const formattedValue = getFormattedValue(
      totalPoolObjectValue,
      assetPrice,
      currency,
    );

    return formattedValue;
  }, [
    totalPoolObjectValue,
    assetPrice,
    currency,
    rate,
    isCollateralBalances,
    address,
  ]);

  const [isHovered, setIsHovered] = useState(false);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {formattedValue}
      </Text>
      {isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {flooredValue}
        </Box>
      )}
    </Row>
  );
};

interface RenderStatsTextProps {
  statsValue?: number;
  text?: string;
  hasDonut?: boolean;
  hovertext?: string;
  kink?: number;
}

interface GetDonutColorProps {
  statsValue: number;
  kink: number;
}

const RenderStatsText: React.FC<RenderStatsTextProps> = ({
  statsValue,
  text,
  hasDonut,
  hovertext,
  kink,
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

  const getDonutColor = React.useMemo(
    () =>
      ({ statsValue, kink }: GetDonutColorProps): string => {
        const thresholdLowerThanKink = kink - 10;
        if (statsValue <= thresholdLowerThanKink) {
          return GreenColorCode;
        } else if (thresholdLowerThanKink < statsValue && statsValue <= kink) {
          return YellowColorCode;
        } else {
          return RedColorCode;
        }
      },
    [statsValue, kink],
  );

  const renderDonutChart = React.useMemo(() => {
    if (statsValue === undefined || kink === undefined || !address) {
      return;
    }

    const rest = OneHundred - statsValue - OffsetRatio;

    const data = [statsValue, rest, OffsetRatio];
    const labels = ["Utilization", "Rest", "Offset"];
    const donutColor = kink
      ? getDonutColor({ statsValue, kink })
      : DarkGrayColorCode;
    const colors = [donutColor, DarkGrayColorCode, LightBlackColorCode];

    return (
      <DonutChart
        data={data}
        labels={labels}
        colors={colors}
        size={DonutSize}
      />
    );
  }, [statsValue, kink, address]);

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
      {hasDonut && !text && renderDonutChart}
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
      {hasDonut && text && renderDonutChart}
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

interface FormatNetAPRTextProps {
  aprType: string;
  rewardType: string;
  aprPercent: number;
  rewardAPR: number;
  t: (key: string) => string;
}

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

  const supplyKink = poolData.supplyKink;

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
  const formatNetAPRText = ({
    aprType,
    rewardType,
    aprPercent,
    rewardAPR,
    t,
  }: FormatNetAPRTextProps): string => {
    return (
      t(aprType) +
      ": " +
      aprPercent.toFixed(2) +
      " % " +
      t(rewardType) +
      ": " +
      rewardAPR.toFixed(3) +
      " %"
    );
  };
  if (
    baseAssetData?.supplyAPR !== undefined &&
    tokenRewardData?.supplyRewardAPR !== undefined
  ) {
    const supplyAPRPercent = baseAssetData?.supplyAPR * OneHundred;
    netEarnAPRValue = supplyAPRPercent + tokenRewardData?.supplyRewardAPR;
    hoverTextEarnAPR = formatNetAPRText({
      aprType: "Earn APR",
      rewardType: "Supply Reward",
      aprPercent: supplyAPRPercent,
      rewardAPR: tokenRewardData?.supplyRewardAPR,
      t,
    });
  }
  if (
    baseAssetData?.borrowAPR !== undefined &&
    tokenRewardData?.borrowRewardAPR !== undefined
  ) {
    const borrowAPRPercent = baseAssetData?.borrowAPR * OneHundred;
    netBorrowAPRValue = borrowAPRPercent - tokenRewardData?.borrowRewardAPR;
    hoverTextBorrowAPR = formatNetAPRText({
      aprType: "Borrow APR",
      rewardType: "Borrow Reward",
      aprPercent: borrowAPRPercent,
      rewardAPR: tokenRewardData?.borrowRewardAPR,
      t,
    });
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
                crossAxisAlignment="center"
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
                  flexWrap="wrap"
                  overflow="visible"
                  ml={0.5}
                  mt={2.5}
                  width="60%"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <RenderAvatar
                        isBaseAsset={false}
                        name={asset?.symbol}
                        src={asset?.logoURL}
                        key={index}
                        style={{
                          marginBottom: NumberOfAvatarPerRowForMobile,
                          marginRight: -MarginRight,
                          width: `calc(${NumberOfAvatarPerRowForMobile}% + ${MarginRight}px)`,
                        }}
                      />
                    );
                  })}
                </Row>
              </Row>
              <RenderStatsText
                statsValue={utilizationValue}
                hasDonut={true}
                kink={supplyKink}
                text={"Utilization"}
              />
              <RenderStatsText
                statsValue={netEarnAPRValue}
                hovertext={hoverTextEarnAPR}
                text={"Net Earn APR"}
              />
              <RenderStatsText
                statsValue={netBorrowAPRValue}
                hovertext={hoverTextBorrowAPR}
                text={"Net Borrow APR"}
              />
              <RenderBalanceText
                totalPoolObjectValue={totalPoolData?.totalBaseSupplyBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Supplied"}
              />
              <RenderBalanceText
                totalPoolObjectValue={totalPoolData?.totalBaseBorrowBalance}
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
            <RenderStatsText
              statsValue={utilizationValue}
              hasDonut={true}
              kink={supplyKink}
            />
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
              totalPoolObjectValue={totalPoolData?.totalBaseBorrowBalance}
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
                  mainAxisAlignment="center"
                  crossAxisAlignment="center"
                  flexWrap="wrap"
                  overflow="visible"
                  ml={0.5}
                  width="100%"
                  display="grid"
                  gridTemplateColumns={`repeat(${NumberOfAvatarPerRow}, 1fr)`}
                  gap={0}
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <RenderAvatar
                        isBaseAsset={false}
                        name={asset?.symbol}
                        src={asset?.logoURL}
                        key={index}
                        style={{
                          marginLeft:
                            index % NumberOfAvatarPerRow !== 0
                              ? `-${OverlappingDegree}px`
                              : "0",
                          zIndex: index,
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

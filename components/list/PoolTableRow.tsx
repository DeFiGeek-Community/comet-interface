import React, { useMemo } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Avatar, AvatarProps, Spinner, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { smallUsdFormatter, smallUsdPriceFormatter } from "utils/bigUtils";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import useUpdatePoolData from "hooks/pool/list/useUpdatePoolData";
import useUpdatePoolRewardData from "hooks/pool/list/useUpdatePoolRewardData";
import { usePool } from "context/PoolContext";
import { Currency } from "context/AppDataContext";
import { ModalDivider } from "components/shared/Modal";
import HoverIcon from "components/shared/HoverIcon";
import { helpSvgUrl } from "constants/urls";
import { OneMillion, OneHundred } from "constants/aprs";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

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
}

const RenderStatsText: React.FC<RenderStatsTextProps> = ({
  statsValue,
  text,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const formattedValue = React.useMemo(() => {
    if (statsValue === undefined || !address) {
      return <Spinner />;
    }

    const valueFormatted = statsValue.toFixed(2);

    return valueFormatted + " %";
  }, [statsValue, address]);

  return (
    <Row
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "12%"}
      pb={text ? 6 : undefined}
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
  const {
    priceFeedData: priceFeedData,
    totalPoolData: totalPoolObject,
    baseAssetData: baseAssetObject,
    collateralAssetsData: collateralAssetsObject,
  } = useUpdatePoolData({ poolConfig: poolData });

  const assetPrice = priceFeedData?.baseAsset ?? null;

  let sumCollateralBalances = 0;

  for (let key in totalPoolObject?.totalCollateralBalances) {
    const collateralBalance =
      totalPoolObject?.totalCollateralBalances?.[key] ?? 0;
    const collateralAssetPrice = priceFeedData?.collateralAssets?.[key] ?? 0;
    const tempValue = collateralBalance * collateralAssetPrice;
    if (tempValue) {
      sumCollateralBalances += tempValue;
    }
  }
  let utilizationValue: number | undefined;
  if (
    totalPoolObject?.totalBaseBorrowBalance &&
    totalPoolObject?.totalBaseSupplyBalance
  ) {
    utilizationValue =
      (totalPoolObject?.totalBaseBorrowBalance /
        totalPoolObject?.totalBaseSupplyBalance) *
      OneHundred;
  } else if (totalPoolObject?.totalBaseBorrowBalance === 0) {
    utilizationValue = 0;
  }
  // const {
  //   chainId,
  //   priceFeedData: priceFeedData2,
  //   totalPoolData: totalPoolObject2,
  //   baseAssetData: baseAssetObject2,
  //   collateralAssetsData: collateralAssetsObject2,
  // } = useAppData();
  //console.log(priceObject2[symbol]);
  // const primaryData = {
  //   priceFeedData: priceFeedData,
  //   baseAssetData: baseAssetObject,
  //   collateralAssetsData: collateralAssetsObject,
  //   totalPoolData: totalPoolObject
  // }
  // const {tokenRewardData: tokenRewardObject} = useUpdatePoolRewardData({ poolConfig: poolData, primaryData} );
  // console.log(tokenRewardObject);
  // const {tokenRewardData: tokenRewardObject} = useUpdatePoolRewardData({ poolConfig: poolData, {
  //   priceFeedData, totalPoolObject, baseAssetObject, collateralAssetsObject,
  // } });
  // const {tokenRewardData: tokenRewardObject} = useUpdatePoolRewardData({ poolConfig: poolData, priceFeedData, baseAssetObject, collateralAssetsObject, totalPoolObject, });
  
  // console.log(baseAssetObject);
  // console.log(collateralAssetsObject);
  // const { tokenRewardData } = useTokenRewardData(poolData, {
  //   priceFeedData,
  //   baseAssetData,
  //   collateralAssetsData,
  //   totalPoolData: totalPoolObject
  // });
  // console.log(tokenRewardData);
  // let netEarnAPRValue: number | undefined;
  // let netBorrowAPRValue: number | undefined;
  // if(baseAssetData?.supplyAPR !== undefined&&tokenRewardData?.supplyRewardAPR !== undefined ){
  //   netEarnAPRValue = baseAssetData?.supplyAPR + tokenRewardData?.supplyRewardAPR;
  // }
  // if(baseAssetData?.borrowAPR !== undefined&&tokenRewardData?.borrowRewardAPR !== undefined ){
  //   netBorrowAPRValue = baseAssetData?.borrowAPR - tokenRewardData?.borrowRewardAPR;
  // }

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
                totalPoolObjectValue={totalPoolObject?.totalBaseSupplyBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Supplied"}
              />
              <RenderBalanceText
                totalPoolObjectValue={totalPoolObject?.totalBaseBorrowBalance}
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
            <RenderStatsText statsValue={utilizationValue} />
            <RenderStatsText statsValue={utilizationValue} />
            <RenderStatsText statsValue={utilizationValue} />
            <RenderBalanceText
              totalPoolObjectValue={totalPoolObject?.totalBaseSupplyBalance}
              assetPrice={assetPrice}
              currency={currency}
              rate={rate}
              isCollateralBalances={false}
            />
            <RenderBalanceText
              totalPoolObjectValue={totalPoolObject?.totalBaseBorrowBalance}
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
                  overflow="scroll"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <RenderAvatar
                        isBaseAsset={false}
                        name={asset?.symbol}
                        src={asset?.logoURL}
                        key={index}
                        mr={1}
                        style={{ marginLeft: index * -4 }}
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

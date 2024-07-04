import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";
import usePool from "hooks/pool/usePool";
import { ModalDivider } from "components/shared/Modal";
import HoverIcon from "components/shared/HoverIcon";
import {
  OneHundred,
  NumberOfAvatarPerRow,
  NumberOfAvatarPerRowForMobile,
  OverlappingDegree,
  MarginRight,
} from "constants/aprs";
import usePoolData from "hooks/pool/usePoolData";
import RenderAvatar from "components/list/RenderAvatar";
import RenderBalanceText from "components/list/RenderBalanceText";
import RenderStatsText from "components/list/RenderStatsText";

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

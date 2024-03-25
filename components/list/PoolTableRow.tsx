import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Text } from "@chakra-ui/react";
import { Column, Row, Center, useIsMobile } from "utils/chakraUtils";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import { smallUsdFormatter, smallUsdPriceFormatter } from "utils/bigUtils";
import { Link } from "@chakra-ui/react";
import HoverIcon from "components/shared/HoverIcon";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";

const PoolTableRow = ({ poolData }: { poolData: PoolConfig | undefined }) => {
  const { t } = useTranslation();

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
    currency,
    rate,
  } = useAppData();

  const assetPrice = priceFeedData?.[symbol]?.baseAsset ?? null;

  let sumCollateralBalances = 0;

  for (let key in totalPoolObject?.[symbol]?.totalCollateralBalances) {
    const collateralBalance =
      totalPoolObject?.[symbol]?.totalCollateralBalances?.[key] ?? 0;
    const collateralAssetPrice =
      priceFeedData?.[symbol]?.collateralAssets?.[key] ?? 0;
    const tempValue = collateralBalance * collateralAssetPrice;
    if (tempValue) {
      sumCollateralBalances += tempValue;
    }
  }

  const isMobile = useIsMobile();

  const { address } = useAccount();

  return (
    <Link
      href={`/pool?pool=${symbol}`}
      width="100%"
      whiteSpace="nowrap"
      className="no-underline"
      pointerEvents="auto"
    >
      {isMobile ? (
        <>
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
                  <Avatar
                    bg="#FFF"
                    boxSize="30px"
                    name={symbol}
                    src={
                      tokenData?.logoURL ??
                      "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                    }
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
                      <Avatar
                        key={index}
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                </Row>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={6}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Supply Balance")}
                </Text>

                {totalPoolObject?.[symbol]?.totalBaseSupplyBalance !==
                  undefined &&
                assetPrice &&
                address ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdPriceFormatter(
                        totalPoolObject?.[symbol]?.totalBaseSupplyBalance,
                        assetPrice,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={6}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Borrow Balance")}
                </Text>

                {totalPoolObject?.[symbol]?.totalBaseBorrowBalance !==
                  undefined &&
                assetPrice &&
                address ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdPriceFormatter(
                        totalPoolObject?.[symbol]?.totalBaseBorrowBalance,
                        assetPrice,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={1}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Collateral Balance")}
                </Text>

                {sumCollateralBalances !== undefined &&
                assetPrice &&
                address ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdFormatter(
                        sumCollateralBalances,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
            </Column>
          </Row>
          <ModalDivider />
        </>
      ) : (
        <>
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="100%"
            px={4}
            py={8}
            backgroundColor={"gray.900"}
            className="hover-row"
            as="button"
            style={{ pointerEvents: address ? "auto" : "none" }}
          >
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "10%"}
            >
              <Text textAlign="center" fontWeight="bold" pl={1}>
                {symbol} {"Pool"}
              </Text>
            </Row>
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="30%"
            >
              <HoverIcon isBase={true} hoverText={symbol}>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  width="40%"
                  pl={7}
                >
                  <Avatar
                    bg="#FFF"
                    boxSize="30px"
                    name={symbol}
                    src={
                      tokenData?.logoURL ??
                      "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                    }
                  />
                </Row>
              </HoverIcon>
              <HoverIcon isBase={false} hoverText={allCollateralSymbols}>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <Avatar
                        key={index}
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                </Row>
              </HoverIcon>
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {totalPoolObject?.[symbol]?.totalBaseSupplyBalance !==
                undefined &&
              assetPrice &&
              address ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdPriceFormatter(
                      totalPoolObject?.[symbol]?.totalBaseSupplyBalance,
                      assetPrice,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {totalPoolObject?.[symbol]?.totalBaseBorrowBalance !==
                undefined &&
              assetPrice &&
              address ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdPriceFormatter(
                      totalPoolObject?.[symbol]?.totalBaseBorrowBalance,
                      assetPrice,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {sumCollateralBalances !== undefined && assetPrice && address ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdFormatter(
                      sumCollateralBalances,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
          </Row>
          <ModalDivider />
        </>
      )}
    </Link>
  );
};

PoolTableRow.displayName = "PoolTableRow";

export default PoolTableRow;

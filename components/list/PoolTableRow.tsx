import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
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
import { usePool } from "context/PoolContext";
import useUpdatePoolData from "hooks/pool/list/useUpdatePoolData";
import { BaseAsset, CollateralAsset } from "interfaces/pool";
import { Currency } from "context/AppDataContext";
import { helpSvgUrl } from "constants/urls";

function RenderBaseAvatar({
  symbol,
  asset,
}: {
  symbol: string;
  asset: BaseAsset | undefined;
}) {
  return (
    <Avatar
      bg="#FFF"
      boxSize="30px"
      name={symbol}
      src={asset?.logoURL ?? helpSvgUrl}
    />
  );
}

function RenderCollateralAvatar({
  asset,
}: {
  asset: CollateralAsset | undefined;
}) {
  return (
    <Avatar
      bg="#FFF"
      boxSize="30px"
      mr={1}
      name={asset?.symbol ?? ""}
      src={asset?.logoURL ?? helpSvgUrl}
    />
  );
}

const RenderBalanceText = ({
  totalPoolObjectValue,
  assetPrice,
  currency,
  rate,
  isCollateralBalances,
  text,
}: {
  totalPoolObjectValue: number | undefined;
  assetPrice: number | null;
  currency: Currency;
  rate?: number;
  isCollateralBalances: boolean;
  text?: string;
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();
  return (
    <Row
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "20%"}
      pb={text ? (isCollateralBalances ? 1 : 6) : undefined}
    >
      {text && (
        <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
          {t(text)}
        </Text>
      )}
      {totalPoolObjectValue !== undefined && assetPrice && address ? (
        <>
          <Text
            color={"#FFF"}
            fontWeight="bold"
            fontSize="17px"
            textAlign="center"
          >
            {!isCollateralBalances
              ? smallUsdPriceFormatter(
                  totalPoolObjectValue,
                  assetPrice,
                  currency,
                  rate || 0,
                )
              : smallUsdFormatter(totalPoolObjectValue, currency, rate || 0)}
          </Text>
        </>
      ) : (
        <Center height="50px">
          <Spinner />
        </Center>
      )}
    </Row>
  );
};

const PoolTableRow = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { address } = useAccount();

  const { setPageName, currency, rate } = useAppData();
  const { setPoolName } = usePool();

  const tokenData = poolData?.baseToken;
  const symbol = tokenData?.symbol ?? "";
  const collateralList = poolData?.assetConfigs;
  let allCollateralSymbols: string = "";
  if (collateralList) {
    for (const assetConfig of collateralList) {
      allCollateralSymbols += assetConfig.symbol + ", ";
    }
  }
  const { priceFeedData: priceFeedData, totalPoolData: totalPoolObject } =
    useUpdatePoolData({ poolConfig: poolData });

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

  const handleClick = () => {
    setPoolName(symbol);
    setPageName("pool");
    router.push(`/pool?pool=${symbol}`, undefined, { shallow: true });
  };

  return (
    <Link
      // href={`/pool?pool=${symbol}`}
      onClick={() => handleClick()}
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
                  <RenderBaseAvatar symbol={symbol} asset={tokenData} />
                </Row>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                  width="60%"
                >
                  {collateralList?.map((asset, index) => {
                    return <RenderCollateralAvatar asset={asset} key={index} />;
                  })}
                </Row>
              </Row>
              <RenderBalanceText
                totalPoolObjectValue={totalPoolObject?.totalBaseSupplyBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Supply Balance"}
              />
              <RenderBalanceText
                totalPoolObjectValue={totalPoolObject?.totalBaseBorrowBalance}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={false}
                text={"Total Borrow Balance"}
              />
              <RenderBalanceText
                totalPoolObjectValue={sumCollateralBalances}
                assetPrice={assetPrice}
                currency={currency}
                rate={rate}
                isCollateralBalances={true}
                text={"Total Collateral Balance"}
              />
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
              width="10%"
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
                  <RenderBaseAvatar symbol={symbol} asset={tokenData} />
                </Row>
              </HoverIcon>
              <HoverIcon isBase={false} hoverText={allCollateralSymbols}>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                >
                  {collateralList?.map((asset, index) => {
                    return <RenderCollateralAvatar asset={asset} key={index} />;
                  })}
                </Row>
              </HoverIcon>
            </Row>
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
          </Row>
          <ModalDivider />
        </>
      )}
    </Link>
  );
};

PoolTableRow.displayName = "PoolTableRow";

export default PoolTableRow;

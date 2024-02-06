import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text, useDisclosure, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { toNumber, truncateTo2DecimalPlaces } from "utils/bigUtils";
import { smallUsdPriceFormatter } from "utils/bigUtils";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import PoolModal, { Mode } from "components/PoolModal";
import { PoolConfig } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";

const CollateralAssetRow = ({
  poolData,
  index,
}: {
  poolData: PoolConfig;
  index: number;
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const { address } = useAccount();

  const authedOpenModal = () => {
    if (!address) return;
    openModal();
  };

  const asset = poolData.assetConfigs[index];
  const symbol = asset?.symbol ? asset?.symbol : "";
  const decimals = asset?.decimals ?? 0;

  const { priceFeedData, collateralAssetsData } = usePoolPrimaryDataContext();
  const collateralAssetData = collateralAssetsData
    ? collateralAssetsData[symbol]
    : undefined;

  const assetPrice = priceFeedData
    ? priceFeedData.collateralAssets[symbol]
    : null;

  const yourSupply = toNumber(collateralAssetData?.yourSupply, decimals);
  const collateralValue = toNumber(
    collateralAssetData?.collateralValue,
    decimals,
  );

  const isMobile = useIsMobile();

  const { t } = useTranslation();
  const { currency, rate } = useAppData();

  return (
    <>
      <PoolModal
        defaultMode={Mode.SUPPLY}
        poolData={poolData}
        index={index}
        isBase={false}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        py={1.5}
        className="hover-row"
        as="button"
        onClick={authedOpenModal}
        style={{ pointerEvents: address ? "auto" : "none" }}
      >
        {/* Underlying Token Data */}
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width={isMobile ? "33%" : "20%"}
        >
          <Avatar
            bg="#FFF"
            boxSize="37px"
            name={symbol}
            src={
              asset?.logoURL ??
              "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
            }
          />
          <Text fontWeight="bold" fontSize="lg" ml={2} flexShrink={0}>
            {symbol}
          </Text>
        </Row>

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width={isMobile ? "33%" : "20%"}
        >
          {yourSupply !== undefined && assetPrice ? (
            <>
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {smallUsdPriceFormatter(
                  yourSupply,
                  assetPrice,
                  currency,
                  rate || 0,
                )}
              </Text>

              <Text fontSize="sm">
                {truncateTo2DecimalPlaces(yourSupply)} {symbol}
              </Text>
            </>
          ) : (
            <Center height="50px">
              <Spinner />
            </Center>
          )}
        </Column>

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width={isMobile ? "33%" : "20%"}
        >
          {collateralValue !== undefined && assetPrice ? (
            <>
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {smallUsdPriceFormatter(
                  collateralValue,
                  assetPrice,
                  currency,
                  rate || 0,
                )}
              </Text>

              <Text fontSize="sm">
                {truncateTo2DecimalPlaces(collateralValue)} {symbol}
              </Text>
            </>
          ) : (
            <Center height="50px">
              <Spinner />
            </Center>
          )}
        </Column>

        {/* APR */}
        {isMobile ? null : (
          <>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width="20%"
            >
              <Row crossAxisAlignment="center" mainAxisAlignment="center">
                <Text textAlign="center" mx={5}>
                  {asset?.borrowCollateralFactor} {"%"}
                </Text>
              </Row>
            </Column>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width="20%"
            >
              <Row crossAxisAlignment="center" mainAxisAlignment="center">
                <Text textAlign="center" mx={5}>
                  {asset?.liquidateCollateralFactor} {"%"}
                </Text>
              </Row>
            </Column>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width="20%"
            >
              <Row crossAxisAlignment="center" mainAxisAlignment="center">
                <Text textAlign="center" mx={5}>
                  {asset?.LiquidationPenalty} {"%"}
                </Text>
              </Row>
            </Column>
          </>
        )}
      </Row>
    </>
  );
};

export default CollateralAssetRow;

import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text, useDisclosure, Spinner } from "@chakra-ui/react";
import useCollateralAssetData from "hooks/pool/indivisual/useCollateralAsset";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import { smallFormatter, smallUsdPriceFormatter } from "utils/bigUtils";
import PoolModal, { Mode } from "components/PoolModal";
import { PoolConfig } from "interfaces/pool";

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

  const authedOpenModal = openModal;

  const asset = poolData.assetConfigs[index];
  const symbol = asset?.symbol ? asset?.symbol : "";

  const isMobile = useIsMobile();

  const { collateralAssetData } = useCollateralAssetData(asset);
  const { priceFeedData } = usePriceFeedData(poolData);
  const assetPrice = priceFeedData
    ? priceFeedData.collateralAssets[symbol]
    : null;

  const { t } = useTranslation();

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
          {collateralAssetData && assetPrice ? (
            <>
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {smallUsdPriceFormatter(
                  collateralAssetData.yourSupply,
                  assetPrice,
                )}
              </Text>

              <Text fontSize="sm">
                {smallFormatter(collateralAssetData.yourSupply)} {symbol}
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
          {collateralAssetData && assetPrice ? (
            <>
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {smallUsdPriceFormatter(
                  collateralAssetData.collateralValue,
                  assetPrice,
                )}
              </Text>

              <Text fontSize="sm">
                {smallFormatter(collateralAssetData.collateralValue)} {symbol}
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
                  {asset?.liquidateCollateralFactor -
                    asset?.borrowCollateralFactor}{" "}
                  {"%"}
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

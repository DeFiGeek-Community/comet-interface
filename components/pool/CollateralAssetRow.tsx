import React, { useState } from "react";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "../../utils/chakraUtils";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import { useTokenData } from "../../hooks/useTokenData";
import PoolModal, { Mode } from "../PoolModal";

const CollateralAssetRow = ({
  assets,
  index,
  comptrollerAddress,
  isPaused,
}: {
  assets: USDPricedFuseAsset[];
  index: number;
  comptrollerAddress: string;
  isPaused: boolean;
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const authedOpenModal = openModal;

  const asset = assets[index];

  const tokenData = useTokenData(asset.underlyingToken);

  const symbol = tokenData?.symbol ? tokenData?.symbol : "";

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  const [hovered, setHovered] = useState<number>(-1);

  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(-1);

  return (
    <>
      <PoolModal
        defaultMode={Mode.SUPPLY}
        comptrollerAddress={comptrollerAddress}
        assets={assets}
        index={index}
        isOpen={isModalOpen}
        onClose={closeModal}
        isBorrowPaused={asset.isPaused}
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
          width="20%"
        >
          <Avatar
            bg="#FFF"
            boxSize="37px"
            name={symbol}
            src={
              tokenData?.logoURL ??
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
          width={isMobile ? "40%" : "20%"}
        >
          <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
            {smallUsdFormatter(asset.supplyBalanceUSD)}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(10).replace("$", "")} {symbol}
          </Text>
        </Column>

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width={isMobile ? "40%" : "20%"}
        >
          <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
            {smallUsdFormatter(
              asset.supplyBalanceUSD * asset?.collateralFactor,
            )}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(10 * asset?.collateralFactor).replace("$", "")}{" "}
            {symbol}
          </Text>
        </Column>

        {/* APY */}
        {isMobile ? null : (
          <>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width="20%"
            >
              <Row crossAxisAlignment="center" mainAxisAlignment="center">
                <Text textAlign="center" mx={5}>
                  {asset?.collateralFactor * 100} {"%"}
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
                  {asset?.liquidationFactor * 100} {"%"}
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
                  {asset?.liquidationPenalty * 100} {"%"}
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

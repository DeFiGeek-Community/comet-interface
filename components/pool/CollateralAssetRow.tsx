import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import PoolModal, { Mode } from "components/PoolModal";
import { PoolConfig } from "interfaces/pool";

const CollateralAssetRow = ({
  poolData,
  index
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
          width="20%"
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
          width={isMobile ? "40%" : "20%"}
        >
          <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
            {smallUsdFormatter(500)}
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
              600
            )}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(10).replace("$", "")}{" "}
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
                  {asset?.borrowCollateralFactor - asset?.liquidateCollateralFactor} {"%"}
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

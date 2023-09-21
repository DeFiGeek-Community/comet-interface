import React, { useState } from "react";
import { Avatar, Text, useDisclosure, AvatarGroup } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SimpleTooltip } from "../shared/SimpleTooltip";
import { CTokenIcon } from "../shared/CTokenIcon";
import { Column, Row, useIsMobile } from "../../utils/chakraUtils";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import { useTokenData } from "../../hooks/useTokenData";
import PoolModal, { Mode } from "../PoolModal";
import APYComponent from "./APYComponent";

const BaseAssetRow = ({
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

  const authedOpenModal = (mode: Mode) => {
    setMode(mode);
    openModal();
  };

  const [mode, setMode] = useState(Mode.BASE_SUPPLY);

  const asset = assets[index];

  const tokenData = useTokenData(asset.underlyingToken);

  const symbol = tokenData?.symbol ? tokenData?.symbol : "";
  const supplyIncentive = asset?.rewardTokensData;

  const rewardTokenData = useTokenData(supplyIncentive);
  const color = rewardTokenData?.color ?? "white";

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  const [hovered, setHovered] = useState<number>(-1);

  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(-1);

  return (
    <>
      <PoolModal
        defaultMode={mode}
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
        px={isMobile ? 2 : 4}
        className="hover-row"
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          height="72px"
          className="hover-row"
          as="button"
          onClick={() => authedOpenModal(Mode.BASE_SUPPLY)}
        >
          {/* Underlying Token Data */}
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="33%"
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

          {/* APY */}
          <APYComponent
            supplyIncentive={supplyIncentive}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width={"33%"}
            >
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {smallUsdFormatter(asset.supplyBalanceUSD)}
              </Text>

              <Text fontSize="sm">
                {smallUsdFormatter(10).replace("$", "")} {symbol}
              </Text>
            </Column>
          )}
        </Row>
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="100%"
          height="72px"
          className="hover-row"
          as="button"
          onClick={() => authedOpenModal(Mode.BASE_WITHDRAW)}
        >
          {/* APY */}
          <APYComponent
            supplyIncentive={supplyIncentive}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <>
              <Column
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width={"33%"}
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
                width={"33%"}
              >
                <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                  {smallUsdFormatter(asset.supplyBalanceUSD)}
                </Text>

                <Text fontSize="sm">
                  {smallUsdFormatter(10).replace("$", "")} {symbol}
                </Text>
              </Column>
            </>
          )}
        </Row>
      </Row>
    </>
  );
};

export default BaseAssetRow;

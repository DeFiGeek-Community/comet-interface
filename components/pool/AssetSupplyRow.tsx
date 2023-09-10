import React, { useState } from "react";
import { Avatar, Text, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SimpleTooltip } from "../shared/SimpleTooltip";
import { Column, Row, useIsMobile } from "../../utils/chakraUtils";
import { useTokenData } from "../../hooks/useTokenData";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { ModalDivider } from "../shared/Modal";
import PoolModal, { Mode } from "../PoolModal";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";

const AssetSupplyRow = ({
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
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        py={1.5}
        className="hover-row"
      >
        {/* Underlying Token Data */}
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="35%"
        >
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="100%"
            as="button"
            onClick={authedOpenModal}
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
        </Column>

        {/* APY */}
        {isMobile ? null : (
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-end"
            width="27%"
            as="button"
            onClick={authedOpenModal}
          >
            <Text color={"#FF"} fontWeight="bold" fontSize="17px">
              40%
            </Text>

            {/* Demo Supply Incentives */}
            {/* {hasSupplyIncentives && (
              <Row
                // ml={1}
                // mb={.5}
                crossAxisAlignment="center"
                mainAxisAlignment="flex-end"
                py={2}
              >
                <Text fontWeight="bold" mr={1}>
                  +
                </Text>
                <AvatarGroup size="xs" max={30} ml={2} mr={1} spacing={1}>
                  {supplyIncentives?.map((supplyIncentive, i) => {
                    return (
                      <SimpleTooltip label={displayedSupplyAPRLabel}>
                        <CTokenIcon
                          address={supplyIncentive.rewardToken}
                          boxSize="20px"
                          onMouseEnter={() => handleMouseEnter(i)}
                          onMouseLeave={() => handleMouseLeave()}
                          _hover={{
                            zIndex: 9,
                            border: ".5px solid white",
                            transform: "scale(1.3);",
                          }}
                        />
                      </SimpleTooltip>
                    );
                  })}
                </AvatarGroup>
                <SimpleTooltip label={displayedSupplyAPRLabel}>
                  <Text color={color} fontWeight="bold" pl={1} fontSize="sm">
                    100% APR
                  </Text>
                </SimpleTooltip>
              </Row>
            )} */}

            <SimpleTooltip
              label={t(
                "The Collateral Factor (CF) ratio defines the maximum amount of tokens in the pool that can be borrowed with a specific collateral. It’s expressed in percentage: if in a pool ETH has 75% LTV, for every 1 ETH worth of collateral, borrowers will be able to borrow 0.75 ETH worth of other tokens in the pool.",
              )}
            >
              <Text fontSize="sm">100% CF</Text>
            </SimpleTooltip>
          </Column>
        )}

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-end"
          width={isMobile ? "40%" : "27%"}
          as="button"
          onClick={authedOpenModal}
        >
          <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
            {smallUsdFormatter(asset.supplyBalanceUSD)}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(10).replace("$", "")} {symbol}
          </Text>
        </Column>
      </Row>
    </>
  );
};

export default AssetSupplyRow;

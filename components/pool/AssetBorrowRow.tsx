import { useTranslation } from "react-i18next";
import { useDisclosure } from "@chakra-ui/react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { SimpleTooltip } from "../shared/SimpleTooltip";
import { Column, Row, useIsMobile } from "../../utils/chakraUtils";
import { shortUsdFormatter, smallUsdFormatter } from "../../utils/bigUtils";
import { useTokenData } from "../../hooks/useTokenData";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import PoolModal, { Mode } from "../PoolModal";

const AssetBorrowRow = ({
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
  const { t } = useTranslation();

  const asset = assets[index];

  const tokenData = useTokenData(asset.underlyingToken);

  const symbol = tokenData?.symbol ? tokenData?.symbol : "";

  const isMobile = useIsMobile();

  // const hasBorrowIncentives = !!borrowIncentives.length;

  return (
    <>
      <PoolModal
        comptrollerAddress={comptrollerAddress}
        defaultMode={Mode.BORROW}
        assets={assets}
        index={index}
        isOpen={isModalOpen}
        onClose={closeModal}
        isBorrowPaused={isPaused}
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
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="27%"
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

        {isMobile ? null : (
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-end"
            width="27%"
          >
            <Text color={"#FF"} fontWeight="bold" fontSize="17px">
              10%
            </Text>

            {/* Demo Borrow Incentives */}
            {/* {hasBorrowIncentives && (
              <Row
                // ml={1}
                // mb={.5}
                crossAxisAlignment="center"
                mainAxisAlignment="flex-end"
                py={1}
              >
                <Text fontWeight="bold" mr={1}>
                  +
                </Text>
                <AvatarGroup size="xs" max={30} ml={2} mr={2} spacing={1}>
                  {borrowIncentives?.map((borrowIncentive, i) => {
                    return (
                      <CTokenIcon
                        address={borrowIncentive.rewardToken}
                        boxSize="20px"
                        _hover={{
                          zIndex: 9,
                          border: ".5px solid white",
                          transform: "scale(1.3);",
                        }}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </AvatarGroup>
                <Text
                  color={
                    "white"
                  }
                  pl={1}
                  fontWeight="bold"
                >
                  70%
                </Text>
              </Row>
            )} */}

            <SimpleTooltip
              label={t(
                "Total Value Lent (TVL) measures how much of this asset has been supplied in total. TVL does not account for how much of the lent assets have been borrowed, use 'liquidity' to determine the total unborrowed assets lent.",
              )}
            >
              <Text fontSize="sm">30 TVL</Text>
            </SimpleTooltip>
          </Column>
        )}

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-end"
          width={isMobile ? "40%" : "27%"}
        >
          <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
            {smallUsdFormatter(100)}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(100).replace("$", "")} {symbol}
          </Text>
        </Column>

        <SimpleTooltip
          label={t(
            "Liquidity is the amount of this asset that is available to borrow (unborrowed). To see how much has been supplied and borrowed in total, navigate to the Pool Info tab.",
          )}
          placement="top-end"
        >
          <Box width={isMobile ? "34%" : "20%"}>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-end"
            >
              <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                {shortUsdFormatter(100)}
              </Text>

              <Text fontSize="sm">
                {shortUsdFormatter(100).replace("$", "")} {symbol}
              </Text>
            </Column>
          </Box>
        </SimpleTooltip>
      </Row>
    </>
  );
};

export default AssetBorrowRow;

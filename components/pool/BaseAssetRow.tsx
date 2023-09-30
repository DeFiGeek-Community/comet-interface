import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Text, useDisclosure, Spinner } from "@chakra-ui/react";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAssetData";
import useTokenRewardData from "hooks/pool/shared/useTokenReward";
import PoolModal, { Mode } from "components/PoolModal";
import APRComponent from "components/pool/APRComponent";
import { PoolConfig } from "interfaces/pool";

const BaseAssetRow = ({ poolData }: { poolData: PoolConfig }) => {
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

  const tokenData = poolData.baseToken;
  const symbol = tokenData?.symbol ? tokenData?.symbol : "";

  const { baseAssetData } = useBaseAssetData(poolData);
  const { tokenRewardData } = useTokenRewardData(poolData);

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  return (
    <>
      <PoolModal
        defaultMode={mode}
        poolData={poolData}
        index={0}
        isBase={true}
        isOpen={isModalOpen}
        onClose={closeModal}
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

          {/* APR */}
          <APRComponent
            rewardToken={poolData.rewardToken}
            baseAPR={baseAssetData?.supplyAPR}
            tokenReward={tokenRewardData?.supplyRewardAPR}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              width={"33%"}
            >
              {baseAssetData ? (
                <>
                  <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                    {smallUsdFormatter(baseAssetData.yourSupply)}
                  </Text>

                  <Text fontSize="sm">
                    {smallFormatter(baseAssetData.yourSupply)}{" "}
                    {symbol}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
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
          onClick={() => authedOpenModal(Mode.BASE_BORROW)}
        >
          {/* APR */}
          <APRComponent
            rewardToken={poolData.rewardToken}
            baseAPR={baseAssetData?.borrowAPR}
            tokenReward={tokenRewardData?.borrowRewardAPR}
            width={isMobile ? "100%" : "33%"}
          />

          {!isMobile && (
            <>
              <Column
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width={"33%"}
              >
                {baseAssetData ? (
                  <>
                    <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                      {smallUsdFormatter(baseAssetData.yourBorrow)}
                    </Text>

                    <Text fontSize="sm">
                      {smallFormatter(baseAssetData.yourBorrow)}{" "}
                      {symbol}
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
                width={"33%"}
              >
                {baseAssetData ? (
                  <>
                    <Text color={"#FFF"} fontWeight="bold" fontSize="17px">
                      {smallUsdFormatter(baseAssetData.availableToBorrow)}
                    </Text>

                    <Text fontSize="sm">
                      {smallFormatter(
                        baseAssetData.availableToBorrow,
                      )}{" "}
                      {symbol}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Column>
            </>
          )}
        </Row>
      </Row>
    </>
  );
};

export default BaseAssetRow;

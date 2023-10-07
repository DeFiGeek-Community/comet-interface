import React from "react";
import { Heading, Text, Avatar, Button, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import useClaimReward from "hooks/pool/indivisual/useClaimReward";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

const ClaimReward = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const { claimReward } = useClaimReward(poolData);

  const asset = poolData.rewardToken;

  const isMobile = useIsMobile();

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <ModalDivider />
      <Heading size="md" px={4} py={3}>
        {t("Token Reward")}
      </Heading>
      <ModalDivider />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={4}
      >
        <Text width={isMobile ? "33%" : "33%"} fontWeight="bold" pl={1}>
          {t("Reward Asset")}
        </Text>
        <Text width={isMobile ? "33%" : "33%"} textAlign="center" fontWeight="bold" pl={1}>
          {t("Your Token Reward")}
        </Text>
        <Text width={isMobile ? "33%" : "33%"} textAlign="center" fontWeight="bold" pl={1}>
          {t("Token Claim")}
        </Text>
      </Row>

      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        expand
        mt={1}
      >
      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        py={1.5}
      >
        {/* Underlying Token Data */}
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width={isMobile ? "33%" : "33%"}
        >
          <Avatar
            bg="#FFF"
            boxSize="37px"
            name={asset?.symbol}
            src={
              asset?.logoURL ??
              "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
            }
          />
          <Text fontWeight="bold" fontSize="lg" ml={2} flexShrink={0}>
            {asset?.symbol}
          </Text>
        </Row>

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="33%"
        >
          {claimReward ? (
            <Row crossAxisAlignment="center" mainAxisAlignment="center">
              <Text textAlign="center" mx={5}>
                {claimReward?.yourTokenReward} {asset?.symbol}
              </Text>
            </Row>
          ) : (
            <Center height="50px">
              <Spinner />
            </Center>
          )}
        </Column>
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="33%"
        >
          {claimReward ? (
            <Row crossAxisAlignment="center" mainAxisAlignment="center">
              <Button
              isLoading={!Boolean(claimReward?.yourTokenReward)}
              >
                Claim
              </Button>
            </Row>
          ) : (
            <Center height="50px">
              <Spinner />
            </Center>
          )}
        </Column>
      </Row>
      </Column>
    </Column>
  );
};

export default ClaimReward;

import React from "react";
import { Heading, Text, Avatar, Button, Spinner } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import rewardAbi from "static/Rewards.json";
import { Column, Row, useIsMobile, Center } from "utils/chakraUtils";
import { truncateTo3DecimalPlaces } from "utils/numberUtils";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import { useReload } from "context/ReloadContext";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

const ClaimReward = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const { claimReward } = usePoolPrimaryDataContext();
  const { address } = useAccount();
  const { reload } = useReload();

  const asset = poolData.rewardToken;

  const isMobile = useIsMobile();

  const onClaim = async () => {
    const config = await prepareWriteContract({
      address: poolData.reward,
      abi: rewardAbi,
      functionName: "claim",
      args: [poolData.proxy, address, true],
    });
    const { hash } = await writeContract(config);
    const data = await waitForTransaction({ hash });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    reload();
  };

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
        <Text
          width={isMobile ? "33%" : "33%"}
          textAlign="center"
          fontWeight="bold"
          pl={1}
        >
          {t("Your Token Reward")}
        </Text>
        <Text
          width={isMobile ? "33%" : "33%"}
          textAlign="center"
          fontWeight="bold"
          pl={1}
        >
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
            {claimReward !== undefined ? (
              <Row crossAxisAlignment="center" mainAxisAlignment="center">
                <Text textAlign="center" mx={5}>
                  {truncateTo3DecimalPlaces(claimReward.yourTokenReward ?? 0)} {asset?.symbol}
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
            <Row crossAxisAlignment="center" mainAxisAlignment="center">
              <Button
                isLoading={
                  !Boolean(
                    claimReward?.yourTokenReward &&
                      claimReward?.yourTokenReward > 0,
                  )
                }
                onClick={onClaim}
              >
                Claim
              </Button>
            </Row>
          </Column>
        </Row>
      </Column>
    </Column>
  );
};

export default ClaimReward;

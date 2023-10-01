import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Box, Button, Image } from "@chakra-ui/react";
import { useBalance, useAccount } from "wagmi";
import { Row } from "utils/chakraUtils";
import { Mode } from "components/PoolModal";
import { BaseAsset, CollateralAsset } from "interfaces/pool";

export const TokenNameAndMaxButton = ({
  updateAmount,
  mode,
  asset,
  maxWithdraw,
}: {
  updateAmount: (newAmount: string) => any;
  mode: Mode;
  asset: BaseAsset | CollateralAsset | undefined;
  maxWithdraw: number | undefined;
}) => {
  const [isMaxLoading, setIsMaxLoading] = useState(false);
  const { address } = useAccount();
  const isBalance = mode == Mode.SUPPLY || mode == Mode.BASE_SUPPLY;
  const { data: tokenBalance, isLoading } = useBalance({
    address,
    token: asset?.address,
    cacheTime: 60_000,
    enabled: isBalance && Boolean(asset?.address),
  });

  const isBalanceLoading = !(isBalance && !isLoading && Boolean(tokenBalance));
  const isWithdrawLoading = !(!isBalance && Boolean(maxWithdraw));
  const { t } = useTranslation();

  const setToMax = async () => {
    setIsMaxLoading(true);
    try {
      const amount =
        isBalance && tokenBalance
          ? tokenBalance.formatted
          : String(maxWithdraw);
      updateAmount(amount);
      setIsMaxLoading(false);
    } catch (e) {
      console.log("TokenNameAndMaxButton_error", e);
    }
  };

  const logoURL =
    asset?.logoURL ??
    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg";

  return (
    <Row
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      flexShrink={0}
    >
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center">
        <Box height="25px" width="25px" mb="2px" mr={2}>
          <Image
            width="100%"
            height="100%"
            borderRadius="50%"
            backgroundImage={`url(/small-white-circle.png)`}
            src={logoURL}
            alt=""
          />
        </Box>
        <Heading fontSize="24px" mr={2} flexShrink={0}>
          {asset?.symbol}
        </Heading>
      </Row>

      <Button
        ml={1}
        height="28px"
        width="58px"
        bg="transparent"
        border="2px"
        borderRadius="8px"
        borderColor="#272727"
        fontSize="sm"
        fontWeight="extrabold"
        color={"#FFF"}
        _hover={{}}
        _active={{}}
        onClick={setToMax}
        isLoading={
          (isBalanceLoading && isBalance) ||
          (isWithdrawLoading && !isBalance) ||
          isMaxLoading
        }
      >
        {t("MAX")}
      </Button>
    </Row>
  );
};

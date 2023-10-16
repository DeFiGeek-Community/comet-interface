import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Box, Button, Image } from "@chakra-ui/react";
import { formatUnits } from "viem";
import { Row } from "utils/chakraUtils";
import { BaseAsset, CollateralAsset } from "interfaces/pool";

export const TokenNameAndMaxButton = ({
  updateAmount,
  asset,
  maxValue,
  isMaxLoading,
}: {
  updateAmount: (newAmount: string) => any;
  asset: BaseAsset | CollateralAsset | undefined;
  maxValue: bigint | undefined;
  isMaxLoading: boolean;
}) => {
  const [isClickLoading, setIsClickLoading] = useState(false);

  const { t } = useTranslation();

  const decimals = asset?.decimals ?? 0;
  const logoURL =
    asset?.logoURL ??
    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg";

  const setToMax = async () => {
    setIsClickLoading(true);
    updateAmount(formatUnits(maxValue ?? BigInt(0), decimals) ?? "0");
    setIsClickLoading(false);
  };

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
        isLoading={isMaxLoading || isClickLoading}
      >
        {t("MAX")}
      </Button>
    </Row>
  );
};

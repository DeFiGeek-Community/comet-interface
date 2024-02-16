import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Box, Button, Image } from "@chakra-ui/react";
import { formatUnits } from "viem";
import { Row } from "utils/chakraUtils";
import { BaseAsset, CollateralAsset } from "interfaces/pool";
import { Mode } from "components/PoolModal";

export const TokenNameAndMaxButton = ({
  updateAmount,
  toggleAllButtons,
  asset,
  maxValue,
  mode,
  isMaxLoading,
  isSupplyMode,
  balanceValue,
  isMaxButtonMode,
}: {
  updateAmount: (newAmount: string) => any;
  toggleAllButtons: (state: boolean) => any;
  asset: BaseAsset | CollateralAsset | undefined;
  maxValue: bigint | undefined;
  mode: Mode;
  isMaxLoading: boolean;
  isSupplyMode: boolean;
  balanceValue: number | bigint;
  isMaxButtonMode: boolean;
}) => {
  const [isClickLoading, setIsClickLoading] = useState(false);

  const [isAllButtonOn, setIsAllButtonOn] = useState(false);

  const { t } = useTranslation();

  const decimals = asset?.decimals ?? 0;
  const logoURL =
    asset?.logoURL ??
    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg";

  useEffect(() => {
    setIsAllButtonOn(false);
  }, [mode]);

  const setToMax = async () => {
    setIsClickLoading(true);
    if (isMaxButtonMode) {
      updateAmount(formatUnits(maxValue ?? BigInt(0), decimals) ?? "0");
    } else {
      updateAmount(formatUnits(BigInt(balanceValue), decimals));
      toggleAllButtons(!isAllButtonOn);
      setIsAllButtonOn(!isAllButtonOn);
    }
    setIsClickLoading(false);
  };

  const getButtonProps = () => {
    if (isMaxButtonMode) {
      return { backgroundColor: "black", label: t("MAX") };
    }

    return {
      backgroundColor: isAllButtonOn ? "#E53E3E" : "#38A169",
      label: isSupplyMode
        ? isAllButtonOn
          ? t("All cancel")
          : t("Repay All")
        : isAllButtonOn
          ? t("All cancel")
          : t("Withdraw All"),
    };
  };

  const { backgroundColor, label } = getButtonProps();

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
        minWidth="58px"
        bg="transparent"
        backgroundColor={backgroundColor}
        border="2px"
        borderRadius="8px"
        borderColor="#272727"
        fontSize="sm"
        fontWeight="extrabold"
        color={"#FFF"}
        pl={2}
        pr={2}
        _hover={{}}
        _active={{}}
        onClick={setToMax}
        isDisabled={isMaxButtonMode ? isMaxLoading : false}
        isLoading={isClickLoading}
      >
        {label}
      </Button>
    </Row>
  );
};

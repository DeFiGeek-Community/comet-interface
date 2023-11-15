import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Box, Button, Image } from "@chakra-ui/react";
import { formatUnits } from "viem";
import { Row } from "utils/chakraUtils";
import { BaseAsset, CollateralAsset } from "interfaces/pool";

export const RepayAllAndWithdrawAllButon = ({
  updateAmount,
  toggleRepayAllButton,
  toggleWithdrawAllButton,
  asset,
  maxValue,
  isSupplyMode,
  isRepayOn,
  isWithdrawOn,
}: {
  updateAmount: (newAmount: string) => any;
  toggleRepayAllButton: (isRepayAllButtonOn: boolean) => any;
  toggleWithdrawAllButton: (isWithdrawAllButtonOn: boolean) => any;
  asset: BaseAsset | CollateralAsset | undefined;
  maxValue: bigint | undefined;
  isSupplyMode: boolean;
  isRepayOn: boolean;
  isWithdrawOn: boolean;
}) => {
  const [isClickLoading, setIsClickLoading] = useState(false);

  const [isRepayAllButtonOn, setIsRepayAllButtonOn] = useState(false);
  const [isWithdrawAllButtonOn, setIsWithdrawAllButtonOn] = useState(false);

  const { t } = useTranslation();

  const decimals = asset?.decimals ?? 0;
  const logoURL =
    asset?.logoURL ??
    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg";

  const setToUintMaxRepayAll = async () => {
    setIsClickLoading(true);
    updateAmount(formatUnits(BigInt(115792089237316195423570985008687907853269984665640564039457584007913129639935), decimals));
    setIsRepayAllButtonOn(!isRepayAllButtonOn);
    toggleRepayAllButton(!isRepayAllButtonOn);
    setIsClickLoading(false);
  };

  const setToUintMaxWithdrawAll = async () => {
    setIsClickLoading(true);
    updateAmount(formatUnits(BigInt(115792089237316195423570985008687907853269984665640564039457584007913129639935), decimals));
    setIsWithdrawAllButtonOn(!isWithdrawAllButtonOn);
    toggleWithdrawAllButton(!isWithdrawAllButtonOn);
    setIsClickLoading(false);
  };

  useEffect(() => {
    if(!isRepayOn)setIsRepayAllButtonOn(false);
    if(!isWithdrawOn)setIsWithdrawAllButtonOn(false);
  }, [isRepayOn, isWithdrawOn]);

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
      {isSupplyMode?
      <Button
        ml={1}
        height="28px"
        minWidth="58px"
        bg="transparent"
        border="2px"
        borderRadius="8px"
        borderColor="#272727"
        fontSize="xs"
        fontWeight="extrabold"
        pl={2}
        pr={2}
        color={"#FFF"}
        _hover={{}}
        _active={{}}
        onClick={setToUintMaxRepayAll}
        isLoading={isClickLoading}
      >
        {t("Repay All")}
      </Button>
      :
      <Button
        ml={1}
        height="28px"
        minWidth="58px"
        bg="transparent"
        border="2px"
        borderRadius="8px"
        borderColor="#272727"
        fontSize="xs"
        fontWeight="extrabold"
        pl={2}
        pr={2}
        color={"#FFF"}
        _hover={{}}
        _active={{}}
        onClick={setToUintMaxWithdrawAll}
        isLoading={isClickLoading}
      >
        {t("Withdraw All")}
      </Button>
      }
    </Row>
  );
};

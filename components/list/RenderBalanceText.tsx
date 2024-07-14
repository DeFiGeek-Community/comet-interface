import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Spinner, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Row, useIsMobile } from "utils/chakraUtils";
import { Currency } from "context/AppDataContext";
import { calculateFlooredValue, getFormattedValue } from "hooks/util/format";

interface RenderBalanceTextProps {
  totalPoolObjectValue?: number;
  assetPrice?: number | null;
  currency: Currency;
  rate?: number;
  isCollateralBalances: boolean;
  text?: string;
}

const RenderBalanceText: React.FC<RenderBalanceTextProps> = ({
  totalPoolObjectValue,
  assetPrice,
  currency,
  rate = 0,
  isCollateralBalances,
  text,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const flooredValue = React.useMemo(() => {
    if (
      totalPoolObjectValue === undefined ||
      assetPrice === null ||
      assetPrice === undefined
    )
      return undefined;
    const flooredValue = calculateFlooredValue({
      isCollateralBalances,
      totalPoolObjectValue,
      assetPrice,
      rate,
    });
    return (currency === "USD" ? "$" : "¥") + flooredValue.toLocaleString();
  }, [totalPoolObjectValue, assetPrice, currency]);
  // バランスの表示値を計算
  const formattedValue = React.useMemo(() => {
    if (totalPoolObjectValue === undefined || assetPrice === null || !address) {
      return <Spinner />;
    }

    if (totalPoolObjectValue > Number.MAX_SAFE_INTEGER) {
      console.log(
        "It is possible that the values exceed the upper limit of what can be safely calculated in javascript, and therefore the values may not be calculated or displayed accurately.",
      );
    }

    const formattedValue = getFormattedValue({
      totalPoolObjectValue,
      assetPrice,
      currency,
      isCollateralBalances,
      rate,
    });

    return formattedValue;
  }, [
    totalPoolObjectValue,
    assetPrice,
    currency,
    rate,
    isCollateralBalances,
    address,
  ]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Row
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "12%"}
      pb={text ? (isCollateralBalances ? 1 : 6) : undefined}
    >
      {text && (
        <Text
          width={currentLanguage === "ja" ? "135px" : "auto"}
          textAlign="left"
          fontWeight="bold"
          mr={currentLanguage === "ja" ? 2 : 4}
        >
          {t(text)}
        </Text>
      )}
      <Text
        color="#FFF"
        fontWeight="bold"
        fontSize="17px"
        textAlign="center"
        as="div"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {formattedValue}
      </Text>
      {isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {flooredValue}
        </Box>
      )}
    </Row>
  );
};

RenderBalanceText.displayName = "RenderBalanceText";

export default RenderBalanceText;

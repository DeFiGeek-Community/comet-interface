import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Spinner, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Row, useIsMobile } from "utils/chakraUtils";
import { Currency } from "context/AppDataContext";
import {
  OneSextillionN,
  OneQuitillionN,
  OneQuadrillionN,
  OneTrillionN,
  OneBillionN,
  OneMillionN,
  OneThousandN,
  OneGaiN,
  OneKeiN,
  OneChouN,
  OneOkuN,
  OneManN,
} from "constants/aprs";

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
    if (totalPoolObjectValue !== undefined && assetPrice) {
      const flooredValue = Math.floor(
        (totalPoolObjectValue * assetPrice) / rate,
      );
      if (currency === "USD") {
        return "$" + flooredValue.toLocaleString();
      } else {
        return "¥" + flooredValue.toLocaleString();
      }
    } else {
      return undefined;
    }
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

    const getFormattedValue = (
      totalPoolObjectValue: number,
      assetPrice: number | undefined,
      currency: Currency,
    ): string => {
      let isUSD: boolean;
      if (currency === "USD") {
        isUSD = true;
      } else {
        isUSD = false;
      }

      const getRoundedNumber = (totalValue: string) => {
        const thresholds = isUSD
          ? [
              {
                threshold: BigInt(OneSextillionN),
                divisor: BigInt(OneSextillionN),
              },
              {
                threshold: BigInt(OneQuitillionN),
                divisor: BigInt(OneQuitillionN),
              },
              {
                threshold: BigInt(OneQuadrillionN),
                divisor: BigInt(OneQuadrillionN),
              },
              {
                threshold: BigInt(OneTrillionN),
                divisor: BigInt(OneTrillionN),
              },
              { threshold: BigInt(OneBillionN), divisor: BigInt(OneBillionN) },
              { threshold: BigInt(OneMillionN), divisor: BigInt(OneMillionN) },
              {
                threshold: BigInt(OneThousandN),
                divisor: BigInt(OneThousandN),
              },
              { threshold: BigInt("0"), divisor: BigInt(1) },
            ]
          : [
              { threshold: BigInt(OneGaiN), divisor: BigInt(OneGaiN) },
              { threshold: BigInt(OneKeiN), divisor: BigInt(OneKeiN) },
              { threshold: BigInt(OneChouN), divisor: BigInt(OneChouN) },
              { threshold: BigInt(OneOkuN), divisor: BigInt(OneOkuN) },
              { threshold: BigInt(OneManN), divisor: BigInt(OneManN) },
              { threshold: BigInt("0"), divisor: BigInt(1) },
            ];

        const totalBigInt = BigInt(totalValue);
        const { divisor } = thresholds.find(
          ({ threshold }) => totalBigInt >= threshold,
        ) || { divisor: BigInt(1) };
        return totalBigInt / divisor;
      };

      let flooredValue: number = 0;
      if (assetPrice) {
        flooredValue = Math.floor((totalPoolObjectValue * assetPrice) / rate);
      }

      const flooredNumber = String(flooredValue);

      const roundedFlooredNumber = getRoundedNumber(flooredNumber);

      let valueFormatted = "";
      if (isUSD) {
        valueFormatted = "$" + roundedFlooredNumber;
      } else {
        valueFormatted = "¥" + roundedFlooredNumber;
      }

      const getUnitText = (totalValue: string) => {
        const thresholds = isUSD
          ? [
              { threshold: BigInt(OneSextillionN), unit: "S" },
              { threshold: BigInt(OneQuitillionN), unit: "Qui" },
              { threshold: BigInt(OneQuadrillionN), unit: "Qua" },
              { threshold: BigInt(OneTrillionN), unit: "T" },
              { threshold: BigInt(OneBillionN), unit: "B" },
              { threshold: BigInt(OneMillionN), unit: "M" },
              { threshold: BigInt(OneThousandN), unit: "K" },
              { threshold: BigInt("0"), unit: "" },
            ]
          : [
              { threshold: BigInt(OneGaiN), unit: "垓" },
              { threshold: BigInt(OneKeiN), unit: "京" },
              { threshold: BigInt(OneChouN), unit: "兆" },
              { threshold: BigInt(OneOkuN), unit: "億" },
              { threshold: BigInt(OneManN), unit: "万" },
              { threshold: BigInt("0"), unit: "" },
            ];

        const totalBigInt = BigInt(totalValue);
        const { unit } = thresholds.find(
          ({ threshold }) => totalBigInt >= threshold,
        ) || { unit: "" };
        return unit;
      };

      return valueFormatted + getUnitText(flooredNumber);
    };

    const formattedValue = getFormattedValue(
      totalPoolObjectValue,
      assetPrice,
      currency,
    );

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

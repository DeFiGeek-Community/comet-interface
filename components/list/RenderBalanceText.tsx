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
      let divisor: bigint;

      const getRoundedNumber = (totalValue: string) => {
        if (currency === "USD") {
          if (BigInt(totalValue) < BigInt(OneThousandN)) {
            divisor = BigInt("1");
          } else if (
            BigInt(OneThousandN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneMillionN)
          ) {
            divisor = BigInt(OneThousandN);
          } else if (
            BigInt(OneMillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneBillionN)
          ) {
            divisor = BigInt(OneMillionN);
          } else if (
            BigInt(OneBillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneTrillionN)
          ) {
            divisor = BigInt(OneBillionN);
          } else if (
            BigInt(OneTrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuadrillionN)
          ) {
            divisor = BigInt(OneTrillionN);
          } else if (
            BigInt(OneQuadrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuitillionN)
          ) {
            divisor = BigInt(OneQuadrillionN);
          } else if (
            BigInt(OneQuitillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneSextillionN)
          ) {
            divisor = BigInt(OneQuitillionN);
          } else {
            divisor = BigInt(OneSextillionN);
          }
        } else if (currency === "JPY") {
          if (BigInt(totalValue) < BigInt(OneManN)) {
            divisor = BigInt("1");
          } else if (
            BigInt(OneManN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneOkuN)
          ) {
            divisor = BigInt(OneManN);
          } else if (
            BigInt(OneOkuN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneChouN)
          ) {
            divisor = BigInt(OneOkuN);
          } else if (
            BigInt(OneChouN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneKeiN)
          ) {
            divisor = BigInt(OneChouN);
          } else if (
            BigInt(OneKeiN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneGaiN)
          ) {
            divisor = BigInt(OneKeiN);
          } else {
            divisor = BigInt(OneGaiN);
          }
        }
        return BigInt(totalValue) / BigInt(divisor);
      };

      let flooredValue: number = 0;
      if (assetPrice) {
        flooredValue = Math.floor((totalPoolObjectValue * assetPrice) / rate);
      }

      const flooredNumber = String(flooredValue);

      const roundedFlooredNumber = getRoundedNumber(flooredNumber);

      let valueFormatted = "";
      if (currency === "USD") {
        valueFormatted = "$" + roundedFlooredNumber;
      } else {
        valueFormatted = "¥" + roundedFlooredNumber;
      }

      const getUnitText = (totalValue: string) => {
        if (currency === "USD") {
          if (BigInt(totalValue) < BigInt(OneThousandN)) {
            return "";
          } else if (
            BigInt(OneThousandN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneMillionN)
          ) {
            return "K";
          } else if (
            BigInt(OneMillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneBillionN)
          ) {
            return "M";
          } else if (
            BigInt(OneBillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneTrillionN)
          ) {
            return "B";
          } else if (
            BigInt(OneTrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuadrillionN)
          ) {
            return "T";
          } else if (
            BigInt(OneQuadrillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneQuitillionN)
          ) {
            return "Qua";
          } else if (
            BigInt(OneQuitillionN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneSextillionN)
          ) {
            return "Qui";
          }
        } else if (currency === "JPY") {
          if (BigInt(totalValue) < BigInt(OneManN)) {
            return "";
          } else if (
            BigInt(OneManN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneOkuN)
          ) {
            return "万";
          } else if (
            BigInt(OneOkuN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneChouN)
          ) {
            return "億";
          } else if (
            BigInt(OneChouN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneKeiN)
          ) {
            return "兆";
          } else if (
            BigInt(OneKeiN) <= BigInt(totalValue) &&
            BigInt(totalValue) < BigInt(OneGaiN)
          ) {
            return "京";
          } else {
            return "垓";
          }
        }
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

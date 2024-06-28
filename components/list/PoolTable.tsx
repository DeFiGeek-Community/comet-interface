import React, { useState } from "react";
import { Heading, Text, Box } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import PoolTableRow from "components/list/PoolTableRow";
import { useAppData } from "context/AppDataContext";
import { PoolDataProvider } from "components/Provider/PoolDataProvider";
import { Currency } from "context/AppDataContext";
import { useAccount } from "wagmi";
import {
  OneSextillion,
  OneQuitillion,
  OneQuadrillion,
  OneTrillion,
  OneBillion,
  OneMillion,
  OneThousand,
  OneSextillionN,
  OneQuitillionN,
  OneQuadrillionN,
  OneTrillionN,
  OneBillionN,
  OneMillionN,
  OneThousandN,
  OneHundred,
  OffsetRatio,
  DarkGrayColorCode,
  LightBlackColorCode,
  DonutSize,
  NumberOfAvatarPerRow,
  NumberOfAvatarPerRowForMobile,
  OverlappingDegree,
  MarginRight,
} from "constants/aprs";
import { smallUsdFormatter, smallUsdPriceFormatter } from "utils/bigUtils";

function RenderPoolTableRow() {
  const { config: poolsConfig } = useAppData();
  if (!poolsConfig) return;

  return Object.values(poolsConfig).map((data, index) => {
    if (data.baseToken) {
      return (
        <PoolDataProvider poolData={data} key={index}>
          <PoolTableRow poolData={data} key={index} />
        </PoolDataProvider>
      );
    }
  });
}

interface TableHeaderColumnProps {
  text: string;
  width: string;
  hovertext?: string;
}

const TableHeaderColumnBase: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
}) => (
  <Row
    mainAxisAlignment="center"
    crossAxisAlignment="center"
    height="100%"
    width={width}
  >
    <Text textAlign="left" fontWeight="bold" width="100%" pl={3}>
      {text}
    </Text>
  </Row>
);

const TableHeaderColumn: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
  hovertext,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Row
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      height="100%"
      width={width}
    >
      <Text textAlign="center" fontWeight="bold" width="100%">
        {text}
      </Text>
      {hovertext && isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {hovertext}
        </Box>
      )}
    </Row>
  );
};

interface RenderBalanceTextProps {
  assetPrice?: number | null;
  currency: Currency;
  rate?: number;
  isCollateralBalances: boolean;
  text?: string;
  pool?: string;
}

const useRenderBalanceText = ({
  assetPrice,
  currency,
  rate = 0,
  isCollateralBalances,
}: RenderBalanceTextProps) => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const { address } = useAccount();
  const currentLanguage = i18n.language;

  const getFormattedValue = (
    assetPrice: number | null | undefined,
    currency: Currency,
    rate: number,
    isCollateralBalances: boolean,
    address: string | undefined,
  ): string => {
    if (assetPrice === null || !address) {
      return "loading";
    }

    // const getRoundedNumber = (totalValue: number) => {
    //   if (currency === "USD") {
    //     if (totalValue < OneThousand) {
    //       return totalValue;
    //     } else if (OneThousand <= totalValue && totalValue < OneMillion) {
    //       return totalValue / OneThousand;
    //     } else if (OneMillion <= totalValue && totalValue < OneBillion) {
    //       return totalValue / OneMillion;
    //     } else if (OneBillion <= totalValue && totalValue < OneTrillion) {
    //       return totalValue / OneBillion;
    //     } else if (OneTrillion <= totalValue && totalValue < OneQuadrillion) {
    //       return totalValue / OneTrillion;
    //     } else if (OneQuadrillion <= totalValue && totalValue < OneQuitillion) {
    //       return totalValue / OneQuadrillion;
    //     } else if (OneQuitillion <= totalValue && totalValue < OneSextillion) {
    //       return totalValue / OneQuitillion;
    //     } else {
    //       return totalValue / OneSextillion;
    //     }
    //   } else if (currency === "JPY") {
    //   }
    // };

    const getRoundedNumber = (totalValue: string) => {
      if (currency === "USD") {
        if (BigInt(totalValue) < BigInt(OneThousandN)) {
          return BigInt(totalValue);
        } else if (BigInt(OneThousandN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneMillionN)) {
          return BigInt(totalValue) / BigInt(OneThousandN);
        } else if (BigInt(OneMillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneBillionN)) {
          return BigInt(totalValue) / BigInt(OneMillionN);
        } else if (BigInt(OneBillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneTrillionN)) {
          return BigInt(totalValue) / BigInt(OneBillionN);
        } else if (BigInt(OneTrillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneQuadrillionN)) {
          return BigInt(totalValue) / BigInt(OneTrillionN);
        } else if (BigInt(OneQuadrillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneQuitillionN)) {
          return BigInt(totalValue) / BigInt(OneQuadrillionN);
        } else if (BigInt(OneQuitillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneSextillionN)) {
          return BigInt(totalValue) / BigInt(OneQuitillionN);
        } else {
          return BigInt(totalValue) / BigInt(OneSextillionN);
        }
      } else if (currency === "JPY") {
      }
    };

    const num = 999;

    const testNumber = String(num);

    const tempValue = getRoundedNumber(testNumber);

    console.log("tempValue " + tempValue);

    let valueFormatted = "";
    if (tempValue && assetPrice) {
      const valuefloored = tempValue;
      if (currency === "USD") {
        valueFormatted = "$" + valuefloored;
      } else {
        valueFormatted = "¥" + valuefloored;
      }
    }

    console.log("valueFormatted " + valueFormatted);

    // const getUnitText = (totalValue: number) => {
    //   if (currency === "USD") {
    //     if (totalValue < OneThousand) {
    //       return "";
    //     } else if (OneThousand <= totalValue && totalValue < OneMillion) {
    //       return "K";
    //     } else if (OneMillion <= totalValue && totalValue < OneBillion) {
    //       return "M";
    //     } else if (OneBillion <= totalValue && totalValue < OneTrillion) {
    //       return "B";
    //     } else if (OneTrillion <= totalValue && totalValue < OneQuadrillion) {
    //       return "T";
    //     } else if (OneQuadrillion <= totalValue && totalValue < OneQuitillion) {
    //       return "Qua";
    //     } else if (OneQuitillion <= totalValue && totalValue < OneSextillion) {
    //       return "Qui";
    //     }
    //   } else if (currency === "JPY") {
    //   }
    // };
    const getUnitText = (totalValue: string) => {
      if (currency === "USD") {
        if (BigInt(totalValue) < BigInt(OneThousandN)) {
          return "";
        } else if (BigInt(OneThousandN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneMillionN)) {
          return "K";
        } else if (BigInt(OneMillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneBillionN)) {
          return "M";
        } else if (BigInt(OneBillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneTrillionN)) {
          return "B";
        } else if (BigInt(OneTrillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneQuadrillionN)) {
          return "T";
        }  else if (BigInt(OneQuadrillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneQuitillionN)) {
          return "Qua";
        } else if (BigInt(OneQuitillionN) <= BigInt(totalValue) && BigInt(totalValue) < BigInt(OneSextillionN)) {
          return "Qui";
        }
      } else if (currency === "JPY") {
      }
    };

    const tempText = valueFormatted + getUnitText(testNumber);

    return tempText;
  };

  const formattedValue = getFormattedValue(
    assetPrice,
    currency,
    rate,
    isCollateralBalances,
    address,
  );

  return {
    formattedValue,
  };
};

const PoolTable = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { address } = useAccount();

  const { currency, rate } = useAppData();

  const utilizationFormula = t("Borrow") + " / " + t("Supply") + " × 100";
  const netEarnAPRFormula = t("Supply APR") + " + " + t("PND Bonus APR");
  const netBorrowAPRFormula = t("Borrow APR") + " - " + t("PND Reward APR");

  const temp = 1;

  const value = useRenderBalanceText({
    assetPrice: temp,
    currency,
    rate,
    isCollateralBalances: false,
  });

  console.log(value);

  return (
    <>
      <DashboardBox
        width="100%"
        height="100%"
        mt={4}
        p={4}
        fontSize="lm"
        fontWeight="bold"
      >
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          height="100%"
          pb={1}
        >
          <Heading size="md" px={4} py={3}>
            {t("Pool Lists")}
          </Heading>
          <ModalDivider />
          {isMobile ? (
            <RenderPoolTableRow />
          ) : (
            <>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                height="50px"
                px={4}
                my={4}
              >
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="flex-start"
                  height="100%"
                  width="16%"
                >
                  <TableHeaderColumnBase text={t("Base Asset")} width="100%" />
                </Row>
                <TableHeaderColumn
                  text={t("Utilization")}
                  width="12%"
                  hovertext={utilizationFormula}
                />
                <TableHeaderColumn
                  text={t("Net Earn APR")}
                  width="12%"
                  hovertext={netEarnAPRFormula}
                />
                <TableHeaderColumn
                  text={t("Net Borrow APR")}
                  width="12%"
                  hovertext={netBorrowAPRFormula}
                />
                <TableHeaderColumn
                  text={t("Total Supply Balance")}
                  width="12%"
                />
                <TableHeaderColumn
                  text={t("Total Borrow Balance")}
                  width="12%"
                />
                <TableHeaderColumn
                  text={t("Total Collateral Balance")}
                  width="12%"
                />
                <Row
                  mainAxisAlignment="center"
                  crossAxisAlignment="center"
                  height="100%"
                  width="12%"
                >
                  <TableHeaderColumn
                    text={t("Collateral Asset")}
                    width="100%"
                  />
                </Row>
              </Row>
              <ModalDivider />
              <RenderPoolTableRow />
              <ModalDivider />
            </>
          )}
        </Column>
      </DashboardBox>
    </>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

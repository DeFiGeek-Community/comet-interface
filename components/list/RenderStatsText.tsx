import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Spinner, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Row, useIsMobile } from "utils/chakraUtils";
import {
  OneHundred,
  OffsetRatio,
  DarkGrayColorCode,
  LightBlackColorCode,
  DonutSize,
} from "constants/aprs";
import { GreenColorCode, YellowColorCode, RedColorCode } from "constants/ratio";
import DonutChart from "components/list/DonutChart";

interface RenderStatsTextProps {
  statsValue?: number;
  text?: string;
  hasDonut?: boolean;
  hovertext?: string;
  kink?: number;
}

interface GetDonutColorProps {
  statsValue: number;
  kink: number;
}

const RenderStatsText: React.FC<RenderStatsTextProps> = ({
  statsValue,
  text,
  hasDonut,
  hovertext,
  kink,
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isMobile = useIsMobile();
  const { address } = useAccount();

  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = React.useMemo(() => {
    if (statsValue === undefined || !address) {
      return <Spinner />;
    }

    const valueFormatted = statsValue.toFixed(2);

    return valueFormatted + " %";
  }, [statsValue, address]);

  const getDonutColor = React.useMemo(
    () =>
      ({ statsValue, kink }: GetDonutColorProps): string => {
        const thresholdLowerThanKink = kink - 10;
        if (statsValue <= thresholdLowerThanKink) {
          return GreenColorCode;
        } else if (thresholdLowerThanKink < statsValue && statsValue <= kink) {
          return YellowColorCode;
        } else {
          return RedColorCode;
        }
      },
    [statsValue, kink],
  );

  const renderDonutChart = React.useMemo(() => {
    if (statsValue === undefined || kink === undefined || !address) {
      return;
    }

    const rest = OneHundred - statsValue - OffsetRatio;

    const data = [statsValue, rest, OffsetRatio];
    const donutColor = kink
      ? getDonutColor({ statsValue, kink })
      : DarkGrayColorCode;
    const colors = [donutColor, DarkGrayColorCode, LightBlackColorCode];

    return <DonutChart data={data} colors={colors} size={DonutSize} />;
  }, [statsValue, kink, address]);

  return (
    <Row
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      mainAxisAlignment={text ? "flex-start" : "center"}
      crossAxisAlignment="center"
      height="100%"
      width={isMobile ? "100%" : "12%"}
      pb={text ? 6 : undefined}
    >
      {hasDonut && !text && renderDonutChart}
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
      {hasDonut && text && renderDonutChart}
      <Text
        color="#FFF"
        fontWeight="bold"
        fontSize="17px"
        textAlign="center"
        as="div"
      >
        {formattedValue}
      </Text>
      {!hasDonut && isHovered && (
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

RenderStatsText.displayName = "RenderStatsText";

export default RenderStatsText;

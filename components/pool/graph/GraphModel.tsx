import React, { useEffect, useState, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useIsMobile } from "utils/chakraUtils";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { GraphModelProps } from "interfaces/graph";
import {
  generateData,
  calculateInitialData,
  calculateYDomain,
  getTransform,
} from "hooks/util/graph";
import {
  AxisRange,
  LeftMin,
  LeftMax,
  LightGrayColorCode,
  LightBlackColorCode,
  PinkColorCode,
  MossGreenColorCode,
} from "constants/graph";
import { Spinner } from "@chakra-ui/react";
import { Center } from "utils/chakraUtils";
import usePoolData from "hooks/pool/usePoolData";
import useInitialUtilization from "hooks/graph/useInitialUtilization";
import { OneHundred } from "constants/graph";
import { truncateTo3DecimalPlaces } from "utils/bigUtils";

const GraphModel: React.FC<GraphModelProps> = ({
  dataKeys,
  labels,
  rewardAPRValue,
}) => {
  const { totalPoolData } = usePoolData();
  const initialUtilization = useInitialUtilization();
  const [initialData, setInitialData] = useState(
    calculateInitialData(initialUtilization, dataKeys),
  );
  const data = useMemo(() => generateData({ dataKeys }), []);

  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const [hoverUtilization, setHoverUtilization] = useState(initialUtilization);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverData, setHoverData] = useState(initialData);
  const [isHovering, setIsHovering] = useState(false);
  const [rewardBorrow, setRewardBorrow] = useState<number | undefined>(
    undefined,
  );
  const [rewardEarn, setRewardEarn] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (rewardAPRValue?.borrow || rewardAPRValue?.borrow === 0) {
      setRewardBorrow(
        (truncateTo3DecimalPlaces(rewardAPRValue.borrow) * hoverData.borrowValue) / OneHundred,
      );
    }
    if (rewardAPRValue?.earn || rewardAPRValue?.earn === 0) {
      setRewardEarn((truncateTo3DecimalPlaces(rewardAPRValue?.earn) * hoverData.earnValue) / OneHundred);
    }
  }, [rewardAPRValue, hoverData]);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive) {
      setHoverUtilization(state.activeLabel);
      setHoverPosition(state.activeCoordinate.x);
      setHoverData(state.activePayload[0].payload);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setHoverUtilization(initialUtilization);
    setHoverPosition(null);
    setHoverData(initialData);
    setIsHovering(false);
  };

  const yDomain = calculateYDomain(data);

  const transform = getTransform(isMobile, hoverPosition);

  useEffect(() => {
    setHoverUtilization(initialUtilization);
    setInitialData(calculateInitialData(initialUtilization, dataKeys));
  }, [initialUtilization]);

  useEffect(() => {
    setHoverData(initialData);
  }, [initialData]);

  return (
    <>
      {totalPoolData ? (
        <Box display="flex" width="100%" height="220px" paddingBottom={5}>
          <Box
            width={isMobile ? "120px" : "150px"}
            p="20px 0px 20px 20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            fontWeight="bold"
          >
            <Box mb="20px">
              <Text fontSize="12px" color={LightGrayColorCode}>
                {t(labels.borrow)}
              </Text>
              <Text fontSize={isMobile ? "15px" : "18px"} color="white">
                {hoverData
                  ? rewardAPRValue?.borrow || rewardAPRValue?.borrow === 0
                    ? `${rewardBorrow?.toFixed(3)}%`
                    : `${hoverData.borrowValue.toFixed(3)}%`
                  : "-"}
              </Text>
            </Box>
            <Box>
              <Text fontSize="12px" color={LightGrayColorCode}>
                {t(labels.earn)}
              </Text>
              <Text fontSize={isMobile ? "15px" : "18px"} color="white">
                {hoverData
                  ? rewardAPRValue?.earn || rewardAPRValue?.earn === 0
                    ? `${rewardEarn?.toFixed(3)}%`
                    : `${hoverData.earnValue.toFixed(3)}%`
                  : "-"}
              </Text>
            </Box>
          </Box>
          <Box flex={1} position="relative">
            <ResponsiveContainer
              width="100%"
              height="100%"
              style={{ marginTop: "20px" }}
            >
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: isMobile ? 0 : 10,
                  bottom: 30,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <CartesianGrid
                  strokeDasharray="3 0"
                  stroke={LightBlackColorCode}
                />
                <XAxis
                  dataKey="utilization"
                  type="number"
                  domain={AxisRange}
                  ticks={AxisRange}
                  stroke={LightBlackColorCode}
                  tickFormatter={(value) => `${value}%`}
                  hide={
                    !isMobile
                      ? (hoverPosition && hoverPosition > 280) ||
                        (!isHovering && initialUtilization > 70)
                        ? true
                        : false
                      : (hoverPosition && hoverPosition > 150) ||
                          (!isHovering && initialUtilization > 55)
                        ? true
                        : false
                  }
                  height={0.5}
                />
                <YAxis
                  domain={yDomain}
                  hide={true}
                  ticks={[
                    yDomain[1] / 4,
                    (yDomain[1] / 4) * 2,
                    (yDomain[1] / 4) * 3,
                  ]}
                />
                <Tooltip content={() => null} />
                {!isHovering && (
                  <ReferenceLine
                    x={initialUtilization}
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
                {isHovering && (
                  <ReferenceLine
                    x={hoverUtilization}
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
                <Line
                  type="linear"
                  dataKey="borrowValue"
                  stroke={PinkColorCode}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                <Line
                  type="linear"
                  dataKey="earnValue"
                  stroke={MossGreenColorCode}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
                {!isHovering && (
                  <>
                    <Line
                      type="linear"
                      dataKey="borrowValue"
                      stroke="none"
                      dot={{
                        r: 4,
                        fill: PinkColorCode,
                        stroke: "white",
                        strokeWidth: 2,
                      }}
                      data={[initialData]}
                    />
                    <Line
                      type="linear"
                      dataKey="earnValue"
                      stroke="none"
                      dot={{
                        r: 4,
                        fill: MossGreenColorCode,
                        stroke: "white",
                        strokeWidth: 2,
                      }}
                      data={[initialData]}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>

            <Box
              fontSize={isMobile ? "14px" : "15px"}
              position="absolute"
              bottom={-4}
              left={
                isHovering
                  ? `${hoverPosition}px`
                  : `${Math.min(Math.max(initialUtilization, LeftMin), LeftMax)}%`
              }
              transform={transform}
              whiteSpace="nowrap"
              transition="left 0s ease-out"
            >
              {t("Utilization")}: {hoverUtilization.toFixed(2)}%
            </Box>
          </Box>
        </Box>
      ) : (
        <Center height="200px">
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default GraphModel;

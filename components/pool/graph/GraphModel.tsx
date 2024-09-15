import React, { useState, useMemo } from "react";
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
import { calculateY, generateData } from "hooks/util/graph";
import {
  OneThousand,
  AxisRange,
  LeftMin,
  LeftMax,
  HoverPositionLowerThreshold,
  HoverPositionUpperThreshold,
  HoverPositionLowerThresholdMobile,
  HoverPositionUpperThresholdMobile,
  LightGrayColorCode,
  LightBlackColorCode,
  PinkColorCode,
  MossGreenColorCode,
} from "constants/graph";

const GraphModel: React.FC<GraphModelProps> = ({
  initialUtilization,
  dataKeys,
  labels,
}) => {
  const initialData = {
    utilization: initialUtilization,
    earnValue: calculateY(
      initialUtilization,
      dataKeys.earn.supplyRateSlopeLow,
      dataKeys.earn.supplyRateSlopeHigh,
      dataKeys.earn.supplyKink,
    ),
    borrowValue:
      calculateY(
        initialUtilization,
        dataKeys.borrow.borrowRateSlopeLow,
        dataKeys.borrow.borrowRateSlopeHigh,
        dataKeys.borrow.borrowKink,
      ) + dataKeys.borrow.borrowRateBase,
  };
  const data = useMemo(() => generateData({ dataKeys }), []);

  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const [hoverUtilization, setHoverUtilization] = useState(initialUtilization);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverData, setHoverData] = useState(initialData);
  const [isHovering, setIsHovering] = useState(false);

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

  const yDomain = [
    0,
    Math.max(...data.map((d) => Math.max(d.earnValue, d.borrowValue))),
  ];

  const getTransform = () => {
    if (isMobile) {
      return hoverPosition !== null &&
        hoverPosition < HoverPositionLowerThresholdMobile
        ? "translateX(0%)"
        : hoverPosition !== null &&
            hoverPosition > HoverPositionUpperThresholdMobile
          ? "translateX(-100%)"
          : "translateX(-50%)";
    } else {
      return hoverPosition !== null &&
        hoverPosition < HoverPositionLowerThreshold
        ? "translateX(0%)"
        : hoverPosition !== null && hoverPosition > HoverPositionUpperThreshold
          ? "translateX(-100%)"
          : "translateX(-50%)";
    }
  };

  return (
    <Box display="flex" width="100%" height="200px">
      <Box
        width={isMobile ? "120px" : "150px"}
        p="20px"
        pl="30px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        fontWeight="bold"
      >
        <Box mb="20px">
          <Text fontSize="12px" color={LightGrayColorCode}>
            {t(labels.borrow)}
          </Text>
          <Text fontSize={isMobile ? "14px" : "18px"} color="white">
            {hoverData
              ? `${Math.floor(hoverData.borrowValue * OneThousand) / OneThousand}%`
              : "-"}
          </Text>
        </Box>
        <Box>
          <Text fontSize="12px" color={LightGrayColorCode}>
            {t(labels.earn)}
          </Text>
          <Text fontSize={isMobile ? "14px" : "18px"} color="white">
            {hoverData
              ? `${Math.floor(hoverData.earnValue * OneThousand) / OneThousand}%`
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
            margin={{ top: 5, right: 30, left: isMobile ? 0 : 10, bottom: 30 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 0" stroke={LightBlackColorCode} />
            <XAxis
              dataKey="utilization"
              type="number"
              domain={AxisRange}
              ticks={AxisRange}
              stroke={LightBlackColorCode}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis domain={yDomain} hide={true} />
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
          position="absolute"
          bottom={3}
          left={
            isHovering
              ? `${hoverPosition}px`
              : `${Math.min(Math.max(initialUtilization, LeftMin), LeftMax)}%`
          }
          transform={getTransform()}
          whiteSpace="nowrap"
          transition="left 0s ease-out"
        >
          Utilization: {hoverUtilization.toFixed(2)}%
        </Box>
      </Box>
    </Box>
  );
};

export default GraphModel;

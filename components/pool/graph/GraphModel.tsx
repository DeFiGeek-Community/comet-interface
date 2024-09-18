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

const GraphModel: React.FC<GraphModelProps> = ({
  initialUtilization,
  dataKeys,
  labels,
}) => {
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
          <Text fontSize="11px" color={LightGrayColorCode}>
            {t(labels.borrow)}
          </Text>
          <Text fontSize={isMobile ? "13px" : "18px"} color="white">
            {hoverData
              ? `${(hoverData.borrowValue).toFixed(3)}%`
              : "-"}
          </Text>
        </Box>
        <Box>
          <Text fontSize="12px" color={LightGrayColorCode}>
            {t(labels.earn)}
          </Text>
          <Text fontSize={isMobile ? "13px" : "18px"} color="white">
            {hoverData
              ? `${(hoverData.earnValue).toFixed(3)}%`
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
          fontSize={isMobile ? "14px" : "15px"}
          position="absolute"
          bottom={3}
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
  );
};

export default GraphModel;

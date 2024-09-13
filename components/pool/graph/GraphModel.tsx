import React, { useState, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
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

interface DataKeys {
  earn: {
    supplyRateSlopeLow: number;
    supplyRateSlopeHigh: number;
    supplyKink: number;
  };
  borrow: {
    borrowRateSlopeLow: number;
    borrowRateSlopeHigh: number;
    borrowKink: number;
    borrowRateBase: number;
  };
}

interface GraphModelProps {
  initialUtilization: number;
  dataKeys: DataKeys;
  labels: { borrow: string; earn: string };
}

interface generateDataProps {
  dataKeys: DataKeys;
}

export const calculateY = (
  x: number,
  rate1: number,
  rate2: number,
  threshold: number,
) => {
  return x < threshold
    ? x * rate1
    : threshold * rate1 + (x - threshold) * rate2;
};

export const generateData = (props: generateDataProps) => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    data.push({
      utilization: i,
      earnValue: calculateY(
        i,
        props.dataKeys.earn.supplyRateSlopeLow,
        props.dataKeys.earn.supplyRateSlopeHigh,
        props.dataKeys.earn.supplyKink,
      ),
      borrowValue:
        calculateY(
          i,
          props.dataKeys.borrow.borrowRateSlopeLow,
          props.dataKeys.borrow.borrowRateSlopeHigh,
          props.dataKeys.borrow.borrowKink,
        ) + props.dataKeys.borrow.borrowRateBase,
    });
  }
  return data;
};

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

  const getStrokeColor = (dataKey: string, x: number) => {
    return x <= hoverUtilization
      ? dataKey === "borrowValue"
        ? "#FF2E6C"
        : "#3B8593"
      : "#ccc";
  };

  const yDomain = [
    0,
    Math.max(...data.map((d) => Math.max(d.earnValue, d.borrowValue))),
  ];
  const margin = { top: 5, right: 30, left: 10, bottom: 30 };

  return (
    <Box display="flex" width="100%" height="200px">
      <Box
        width="150px"
        p="20px"
        pl="30px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        fontWeight="bold"
      >
        <Box mb="20px">
          <Text fontSize="12px" color="#949494">
            {labels.borrow}
          </Text>
          <Text fontSize="18px" color="white">
            {hoverData ? `${hoverData.borrowValue.toFixed(3)}%` : "-"}
          </Text>
        </Box>
        <Box>
          <Text fontSize="12px" color="#949494">
            {labels.earn}
          </Text>
          <Text fontSize="18px" color="white">
            {hoverData ? `${hoverData.earnValue.toFixed(3)}%` : "-"}
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
            margin={margin}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 0" stroke="#3a4450" />
            <XAxis
              dataKey="utilization"
              type="number"
              domain={[0, 100]}
              ticks={[0, 100]}
              stroke="#3a4450"
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
              stroke={getStrokeColor("borrowValue", hoverUtilization)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="earnValue"
              stroke={getStrokeColor("earnValue", hoverUtilization)}
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
                    fill: "#FF2E6C",
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
                    fill: "#3B8593",
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
              : `${Math.min(Math.max(initialUtilization, 20), 80)}%`
          }
          transform={
            hoverPosition !== null && hoverPosition < 150
              ? "translateX(0%)"
              : hoverPosition !== null && hoverPosition > 315
              ? "translateX(-100%)"
              : "translateX(-50%)"
          }
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

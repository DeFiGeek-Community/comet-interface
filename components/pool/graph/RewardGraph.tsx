import React, { useState, useMemo } from "react";
import { PoolConfig } from "interfaces/pool";
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

const calculateY = (
  x: number,
  rate1: number,
  rate2: number,
  threshold: number,
) => {
  if (x < threshold) {
    return x * rate1;
  } else {
    return threshold * rate1 + (x - threshold) * rate2;
  }
};

const generateData = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    data.push({
      utilization: i,
      earnReward: calculateY(i, 0, 6.67, 85),
      borrowReward: calculateY(i, 0, -6.67, 85) + 100,
    });
  }
  return data;
};

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const data = useMemo(() => generateData(), []);
  const initialUtilization = 60.52;

  // Calculate initial APR values directly using the calculateY function
  const initialEarnReward = calculateY(initialUtilization, 0, 6.67, 85);
  const initialBorrowReward =
    calculateY(initialUtilization, 0, -6.67, 85) + 100;

  const initialData = {
    utilization: initialUtilization,
    earnReward: initialEarnReward,
    borrowReward: initialBorrowReward,
  };

  const [hoverUtilization, setHoverUtilization] = useState(initialUtilization);
  const [hoverPosition, setHoverPosition] = useState(null);
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
      ? dataKey === "borrowReward"
        ? "#FF2E6C"
        : "#3B8593"
      : "#ccc";
  };

  const yDomain = [
    0,
    Math.max(...data.map((d) => Math.max(d.earnReward, d.borrowReward))),
  ];
  const height = 200;
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
            Borrow Reward
          </Text>
          <Text fontSize="18px" color="white">
            {hoverData && hoverData.borrowReward !== undefined
              ? `${hoverData.borrowReward.toFixed(3)}%`
              : "-"}
          </Text>
        </Box>
        <Box>
          <Text fontSize="12px" color="#949494">
            Earn Reward
          </Text>
          <Text fontSize="18px" color="white">
            {hoverData && hoverData.earnReward !== undefined
              ? `${hoverData.earnReward.toFixed(3)}%`
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
              dataKey="borrowReward"
              stroke={getStrokeColor("borrowReward", hoverUtilization)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="earnReward"
              stroke={getStrokeColor("earnReward", hoverUtilization)}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            {!isHovering && (
              <>
                <Line
                  type="linear"
                  dataKey="borrowReward"
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
                  dataKey="earnReward"
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
          bottom={10}
          left={
            isHovering
              ? `${hoverPosition}px`
              : `${(initialUtilization / 100) * 100}%`
          }
          transform="translateX(-50%)"
          whiteSpace="nowrap"
          transition="left 0s ease-out"
        >
          Utilization: {hoverUtilization.toFixed(2)}%
        </Box>
      </Box>
    </Box>
  );
};

export default RewardGraph;

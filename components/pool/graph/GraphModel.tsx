import React, { useState, useMemo } from "react";
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
      earnAPR: calculateY(i, 0.04, 0.99, 90),
      borrowAPR: calculateY(i, 0.025, 0.99, 90) + 2.75,
    });
  }
  return data;
};

const GraphModel = () => {
  const data = useMemo(() => generateData(), []);
  const initialUtilization = 60.52;

  // Calculate initial APR values directly using the calculateY function
  const initialEarnAPR = calculateY(initialUtilization, 0.04, 0.99, 90);
  const initialBorrowAPR = calculateY(initialUtilization, 0.025, 0.99, 90) + 2.75;

  const initialData = {
    utilization: initialUtilization,
    earnAPR: initialEarnAPR,
    borrowAPR: initialBorrowAPR,
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
      ? dataKey === "borrowAPR"
        ? "#8884d8"
        : "#82ca9d"
      : "#ccc";
  };

  const yDomain = [0, Math.max(...data.map(d => Math.max(d.earnAPR, d.borrowAPR)))];
  const height = 200;
  const margin = { top: 5, right: 30, left: 10, bottom: 30 };

  return (
    <div
      style={{
        display: "flex",
        width: "50%",
        height: "200px",
        backgroundColor: "#1E2833",
      }}
    >
      <div
        style={{
          width: "150px",
          padding: "20px",
          paddingLeft: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontWeight: "bold", 
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", color: "#949494", }}>Borrow APR</div>
          <div style={{ fontSize: "20px", color: "white", }}>
            {hoverData ? `${hoverData.borrowAPR.toFixed(3)}%` : "-"}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "#949494", }}>Earn APR</div>
          <div style={{ fontSize: "20px", color: "white", }}>
            {hoverData ? `${hoverData.earnAPR.toFixed(3)}%` : "-"}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative"}}>
        <ResponsiveContainer width="100%" height="100%" style={{ marginTop: "20px" }} >
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
              <ReferenceLine x={initialUtilization} stroke="white" strokeWidth={2} />
            )}
            {isHovering && (
              <ReferenceLine x={hoverUtilization} stroke="white" strokeWidth={2} />
            )}
            <Line
              type="linear"
              dataKey="borrowAPR"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              //strokeColor={({ payload }) => getStrokeColor('borrowAPR', payload.utilization)}
            />
            <Line
              type="linear"
              dataKey="earnAPR"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              //strokeColor={({ payload }) => getStrokeColor('earnAPR', payload.utilization)}
            />
            {!isHovering && (
              <>
                <Line
                  type="linear"
                  dataKey="borrowAPR"
                  stroke="none"
                  dot={{
                    r: 4,
                    fill: "#8884d8",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  data={[initialData]}
                />
                <Line
                  type="linear"
                  dataKey="earnAPR"
                  stroke="none"
                  dot={{
                    r: 4,
                    fill: "#82ca9d",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  data={[initialData]}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: isHovering
              ? `${hoverPosition}px`
              : `${(initialUtilization / 100) * 100}%`,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            transition: "left 0s ease-out",
          }}
        >
          Utilization: {hoverUtilization.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default GraphModel;

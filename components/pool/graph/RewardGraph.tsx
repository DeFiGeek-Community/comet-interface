import React, { useState, useCallback } from "react";
import { PoolConfig } from "interfaces/pool";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Text,
} from "recharts";

const generateData = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    let y1, y2;
    if (i <= 85) {
      y1 = 100;
      y2 = 0;
    } else {
      y1 = -6.67 * (i - 85) + 100;
      y2 = 6.67 * (i - 85);
    }
    data.push({ x: i, y1, y2 });
  }
  return data;
};

const RewardGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const data = generateData();
  const initialX = 60.52;
  const [cursorX, setCursorX] = useState(initialX);
  const [isOutside, setIsOutside] = useState(true);

  const handleMouseMove = useCallback((props: { activeLabel?: string | number }) => {
    if (props && props.activeLabel !== undefined) {
      setCursorX(Number(props.activeLabel)); // activeLabelを数値に変換
      setIsOutside(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOutside(true);
  }, []);

  // カスタムドットコンポーネント
  const CustomDot: React.FC<{ cx: number; cy: number; stroke: string; fill: string }> = ({ cx, cy, stroke, fill }) => (
    <circle cx={cx} cy={cy} r={4} stroke={stroke} strokeWidth={2} fill={fill} />
  );

  // カスタムX軸ティックフォーマッター
  const formatXAxis = (tickItem: number) => {
    if (tickItem === 0) return "0%";
    if (tickItem === 100) return "100%";
    return "";
  };

  // Utilization ラベルのカスタムコンポーネント
  const UtilizationLabel: React.FC<{ x: number; y: number; }> = ({ x, y }) => (
    <Text x={x} y={y} fill="#ffffff" textAnchor="middle" verticalAnchor="start">
      {`utilization ${initialX.toFixed(2)}%`}
    </Text>
  );

  return (
    <div style={{ width: "50%", height: "200px", backgroundColor: "#1E2833" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3a4450" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[0, 100]} 
            stroke="#ffffff"
            tickFormatter={formatXAxis}
            ticks={[0, 100]}
          />
          <YAxis 
            type="number" 
            domain={[0, 100]} 
            stroke="#ffffff"
            tick={{ stroke: '#ffffff' }}
            tickCount={6}
            tickSize={10}
            tickFormatter={() => ''}
            allowDataOverflow={true}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E2833', border: '1px solid #ffffff' }}
            itemStyle={{ color: '#ffffff' }}
            formatter={(value, name, props) => [`${value}%`, name]}
            labelFormatter={(label) => `${label}%`}
          />
          <Line
            type="linear"
            dataKey="y1"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="y2"
            stroke="#82ca9d"
            dot={false}
            isAnimationActive={false}
          />
          {isOutside && (
            <>
              <ReferenceLine x={initialX} stroke="white" strokeWidth={2} />
              <Line
                dataKey="y1"
                stroke="none"
                dot={<CustomDot stroke="white" fill="#8884d8" cx={initialX} cy={100} />}
                isAnimationActive={false}
                data={[{ x: initialX, y1: 100 }]}
              />
              <Line
                dataKey="y2"
                stroke="none"
                dot={<CustomDot stroke="white" fill="#82ca9d" cx={initialX} cy={0} />}
                isAnimationActive={false}
                data={[{ x: initialX, y2: 0 }]}
              />
              <UtilizationLabel 
                x={initialX / 100 * (100 - 20) + 20} 
                y={350}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardGraph;
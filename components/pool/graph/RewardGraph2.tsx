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
  Label,
} from "recharts";

const generateData = () => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    let borrowReward, earnReward;
    if (i <= 85) {
      borrowReward = 100;
      earnReward = 0;
    } else {
      borrowReward = -6.67 * (i - 85) + 100;
      earnReward = 6.67 * (i - 85);
    }
    data.push({ x: i, borrowReward, earnReward });
  }
  return data;
};

const RewardGraph2 = ({ poolData }: { poolData: PoolConfig }) => {
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

  return (
    <div style={{ width: "50%", height: "200px", backgroundColor: "#1E2833" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
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
            formatter={(value, name, props) => [`${value}%`, name === 'borrowReward' ? 'Borrow Reward' : 'Earn Reward']}
            labelFormatter={(label) => `${label}%`}
          />
          <Line
            type="linear"
            dataKey="borrowReward"
            stroke="#8884d8"
            name="Borrow Reward"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="earnReward"
            stroke="#82ca9d"
            name="Earn Reward"
            dot={false}
            isAnimationActive={false}
          />
          <ReferenceLine x={isOutside ? initialX : cursorX} stroke="white" strokeWidth={2}>
            <Label
              value={`utilization: ${(isOutside ? initialX : cursorX).toFixed(2)}%`}
              position="bottom"
              fill="#ffffff"
              style={{ textAnchor: 'middle' }}
            />
          </ReferenceLine>
          {isOutside && (
            <>
              <Line
                dataKey="borrowReward"
                stroke="none"
                dot={<CustomDot stroke="white" fill="#8884d8" cx={initialX} cy={100} />}
                isAnimationActive={false}
                data={[{ x: initialX, borrowReward: 100 }]}
              />
              <Line
                dataKey="earnReward"
                stroke="none"
                dot={<CustomDot stroke="white" fill="#82ca9d" cx={initialX} cy={0} />}
                isAnimationActive={false}
                data={[{ x: initialX, earnReward: 0 }]}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RewardGraph2;
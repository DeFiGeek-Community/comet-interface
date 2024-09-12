import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";

interface GraphModelProps {
  data: Array<{ utilization: number; earnAPR: number; borrowAPR: number }>;
  initialUtilization: number;
  hoverUtilization: number;
  isHovering: boolean;
  handleMouseMove: (e: React.MouseEvent<SVGElement>) => void;
  handleMouseLeave: () => void;
  getStrokeColor: (key: string, hoverUtilization: number) => string;
}

const GraphModel: React.FC<GraphModelProps> = ({
  data,
  initialUtilization,
  hoverUtilization,
  isHovering,
  handleMouseMove,
  handleMouseLeave,
  getStrokeColor,
}) => {
  const yDomain = [0, Math.max(...data.map(d => Math.max(d.earnAPR, d.borrowAPR)))];
  const margin = { top: 5, right: 30, left: 10, bottom: 30 };

  return (
    <ResponsiveContainer width="100%" height="100%" style={{ marginTop: "20px" }}>
      <LineChart
        data={data}
        margin={margin}
        onMouseMove={(e) => handleMouseMove(e as React.MouseEvent<SVGElement>)}
        onMouseLeave={handleMouseLeave}
      >
        <CartesianGrid strokeDasharray="3 0" stroke="#3a4450" />
        <XAxis dataKey="utilization" type="number" domain={[0, 100]} ticks={[0, 100]} stroke="#3a4450" tickFormatter={(value) => `${value}%`} />
        <YAxis domain={yDomain} hide={true} />
        <Tooltip content={() => null} />
        {!isHovering && <ReferenceLine x={initialUtilization} stroke="white" strokeWidth={2} />}
        {isHovering && <ReferenceLine x={hoverUtilization} stroke="white" strokeWidth={2} />}
        <Line type="linear" dataKey="borrowAPR" stroke={getStrokeColor('borrowAPR', hoverUtilization)} strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line type="linear" dataKey="earnAPR" stroke={getStrokeColor('earnAPR', hoverUtilization)} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphModel;
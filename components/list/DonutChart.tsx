import React, { useRef, useEffect } from "react";
import { LightBlackColorCode, DonutSize } from "constants/aprs";

interface DonutChartProps {
  data: number[];
  colors: string[];
  size?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  colors,
  size = DonutSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawDonutChart(ctx, data, colors, size);
      }
    }
  }, [data, colors, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

const drawDonutChart = (
  ctx: CanvasRenderingContext2D,
  data: number[],
  colors: string[],
  size: number,
) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = Math.max(size / 2 - 20, 10); // Limit the radius to no less than 10
  const donutRadius = 0.7;
  const total = data.reduce((sum, value) => sum + value, 0);

  let startAngle = -0.5 * Math.PI;
  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    const angle = (value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle, false);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();

    startAngle += angle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius * donutRadius,
      startAngle,
      startAngle + angle,
      true,
    );
    ctx.closePath();
    ctx.fillStyle = LightBlackColorCode;
    ctx.fill();
  }
};
DonutChart.displayName = "DonutChart";

export default DonutChart;

import React from "react";
import { useIsMobile } from "utils/chakraUtils";
import styled, { keyframes } from "styled-components";
import {
  DangerRatio,
  GreenColorCode,
  YellowColorCode,
  RedColorCode,
  StatusBarContainer,
} from "constants/rario";

export interface StatusBarProps {
  leeway: number;
  warning: number;
  overlay: { value: number; color: string };
}

const ProgressFill = styled.div<{
  width: number;
  color: string;
}>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  background-image: linear-gradient(
    -45deg,
    #121212 25%,
    transparent 25%,
    transparent 50%,
    #121212 50%,
    #121212 75%,
    transparent 75%,
    transparent
  );
  background-size: 0.5rem 0.5rem;
  animation: ${keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 1rem 0; }
  `} 5s linear infinite;
`;

const OverlayStatusBarFill = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  border-right: 3px solid black;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const getOverlayValuePosition = (value: number) => {
  const isMobile = useIsMobile();
  if (value >= 10) {
    return isMobile ? `${value - 23}%` : `${value - 6}%`;
  } else {
    return "0%";
  }
};

const OverlayValue = styled.div<{
  width: number;
}>`
  position: absolute;
  bottom: 3px;
  left: ${({ width }) => getOverlayValuePosition(width)}%;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: bold;
  z-index: 3;
`;

const StatusBar: React.FC<StatusBarProps> = ({ leeway, warning, overlay }) => {
  return (
    <StatusBarContainer>
      <ProgressFill width={leeway} color={GreenColorCode} />
      <ProgressFill width={warning} color={YellowColorCode} />
      <ProgressFill width={DangerRatio} color={RedColorCode} />
      <OverlayValue width={overlay.value}>{overlay.value}%</OverlayValue>
      <OverlayStatusBarFill width={overlay.value} color={overlay.color} />
    </StatusBarContainer>
  );
};

export default StatusBar;

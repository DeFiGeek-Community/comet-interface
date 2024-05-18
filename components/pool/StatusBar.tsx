import React from "react";
import styled, { keyframes } from "styled-components";
import {
  DangerRatio,
  GreenColorCode,
  YellowColorCode,
  RedColorCode,
  StatusBarContainer,
} from "constants/rario";
import RenderStatusBarGray from "./StatusBarGray";

export interface StatusBarProps {
  leeway: number;
  warning: number;
  $hasCollateral?: string;
  overlay?: { value: number; color: string };
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
  background-size: 1rem 1rem;
  animation: ${keyframes`
    0% { background-position: 0 0; }
    100% { background-position: 1rem 0; }
  `} 5s linear infinite;
`;

const OverlayStatusBarFill = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const OverlayValue = styled.div<{ width: number; color: string }>`
  position: absolute;
  bottom: 3px;
  left: ${({ width }) => (width > 10 ? width - 6 : 0)}%;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: bold;
  z-index: 3;
`;

const StatusBar: React.FC<StatusBarProps> = ({
  leeway,
  warning,
  $hasCollateral,
  overlay,
}) => {
  return (
    <StatusBarContainer>
      {$hasCollateral === "true" ? (
        <>
          <ProgressFill width={leeway} color={GreenColorCode} />
          <ProgressFill width={warning} color={YellowColorCode} />
          <ProgressFill width={DangerRatio} color={RedColorCode} />
        </>
      ) : (
        <>
          <RenderStatusBarGray />
        </>
      )}
      {overlay && (
        <>
          {$hasCollateral === "true" && (
            <>
              <OverlayValue width={overlay.value} color={overlay.color}>
                {overlay.value}%
              </OverlayValue>
              <OverlayStatusBarFill
                width={overlay.value}
                color={overlay.color}
              />
            </>
          )}
        </>
      )}
    </StatusBarContainer>
  );
};

export default StatusBar;

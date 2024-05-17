import React from "react";
import styled, { css, keyframes } from "styled-components";
import {
  DangerRatio,
  GreenColorCode,
  YellowColorCode,
  RedColorCode,
} from "constants/rario";

export interface StatusBarProps {
  leeway: number;
  warning: number;
  $hasCollateral?: string;
  $striped: string;
  $animated: string;
  $lightened: string;
  overlay?: { value: number; color: string };
}

const StatusBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  position: relative;
`;

const stripedAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 1rem 0; }
`;

const baseStripedStyle = css`
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
`;

const stripedStyle = css`
  ${baseStripedStyle}
`;

const stripedAnimatedStyle = css`
  ${baseStripedStyle}
  animation: ${stripedAnimation} 5s linear infinite;
`;

const ProgressFill = styled.div<{
  width: number;
  color: string;
  $striped: string;
  $animated: string;
}>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  ${({ $striped, $animated }) =>
    $striped === "true" && $animated === "true"
      ? stripedAnimatedStyle
      : stripedStyle}
`;

const ProgressFillGrayOut = styled.div`
  height: 100%;
  width: 100%;
  background-color: #808080;
`;

const overlayAnimation = (width: number) => keyframes`
  0% {
    transform: translateX(200%) skewX(-45deg);
    opacity: ${width >= 100 ? 1 : 0};
  }
  50% {
    transform: translateX(0%) skewX(-45deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-200%) skewX(-45deg);
    opacity: ${width >= 100 ? 1 : 0};
  }
`;

const OverlayLight = styled.div<{ width: number; color: string }>`
  position: absolute;
  right: -${({ width }) => width}%;
  top: 0;
  height: 100%;
  width: ${({ width }) => width * 2}%;
  z-index: 2;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: ${({ width }) => css`
      ${overlayAnimation(width)}
    `}
    5s linear infinite;
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
  $striped,
  $animated,
  $lightened,
  overlay,
}) => {
  return (
    <StatusBarContainer>
      {$hasCollateral === "true" ? (
        <>
          <ProgressFill
            width={leeway}
            color={GreenColorCode}
            $striped={$striped}
            $animated={$animated}
          />
          <ProgressFill
            width={warning}
            color={YellowColorCode}
            $striped={$striped}
            $animated={$animated}
          />
          <ProgressFill
            width={DangerRatio}
            color={RedColorCode}
            $striped={$striped}
            $animated={$animated}
          />
        </>
      ) : (
        <>
          <ProgressFillGrayOut />
        </>
      )}
      {overlay && (
        <>
          {$lightened === "true" && (
            <OverlayLight width={overlay.value} color={overlay.color} />
          )}
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

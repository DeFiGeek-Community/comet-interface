import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface StatusBarProps {
  success: number;
  warning: number;
  danger: number;
  striped: boolean;
  animated: boolean;
  lightened: boolean;
  overlay?: { value: number; color: string };
}

const STATUS_BAR_CONTAINER_PROPS = {
  width: '100%',
  height: '5px',
  backgroundColor: "#e0e0e0", 
  borderRadius: '10px',
  display: 'flex',
  position: 'relative',
};

const StatusBarContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div {...STATUS_BAR_CONTAINER_PROPS}>
      {children}
    </div>
  );
};

// const StatusBarContainer = styled.div`
//   width: 100%;
//   height: 5px;
//   background-color: #e0e0e0;
//   border-radius: 10px;
//   display: flex;
//   position: relative;
// `;

const stripedAnimation = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 1rem 0; }
`;

const stripedStyle = css`
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

const stripedAnimatedStyle = css`
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
  animation: ${stripedAnimation} 3s linear infinite;
`;

const ProgressFill = styled.div<{ width: number; color: string; striped: boolean; animated: boolean }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  ${({ striped, animated }) => (striped && animated ? stripedAnimatedStyle : stripedStyle)}
`;

// const overlayAnimation = (width: number) => keyframes`
//   0% {
//     transform: translateX(-100%);
//     clip-path: inset(0 ${100 - width}% 0 0);
//   }
//   50% {
//     transform: translateX(0%);
//     clip-path: inset(0 0 0 0);
//   }
//   100% {
//     transform: translateX(${width}%);
//     clip-path: inset(0 0 0 ${100 - width}%);
//   }
// `;

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
  animation: ${({ width }) => css`${overlayAnimation(width)}`} 5s linear infinite;
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
  bottom: -6px;
  left: ${({ width }) => width - 3}%;
  background-color: #000;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: bold;
  z-index: 3;
`;

const StatusBar: React.FC<StatusBarProps> = ({
  success,
  warning,
  danger,
  striped,
  animated,
  lightened,
  overlay,
}) => {
  return (
    <StatusBarContainer>
      <ProgressFill width={success} color="#4caf50" striped={striped} animated={animated} />
      <ProgressFill width={warning} color="#ffc107" striped={striped} animated={animated} />
      <ProgressFill width={danger} color="#f44336" striped={striped} animated={animated} />
      {overlay && (
        <>
          <OverlayValue width={overlay.value} color={overlay.color}>{overlay.value}%</OverlayValue>
          {lightened && <OverlayLight width={overlay.value} color={overlay.color} />}
          <OverlayStatusBarFill width={overlay.value} color={overlay.color} />
        </>
      )}
    </StatusBarContainer>
  );
};

export default StatusBar;
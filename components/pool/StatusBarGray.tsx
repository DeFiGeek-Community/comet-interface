import React from "react";
import { StatusBarContainer, ProgressFillGrayOut } from "constants/rario";

export const RenderStatusBarGray = () => {
  return <ProgressFillGrayOut />;
};

const StatusBarGray = () => {
  return (
    <StatusBarContainer>
      <RenderStatusBarGray />
    </StatusBarContainer>
  );
};

export default StatusBarGray;

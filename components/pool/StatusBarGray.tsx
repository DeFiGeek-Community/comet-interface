import React from "react";
import styled from "styled-components";

const StatusBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  position: relative;
`;

const ProgressFillGrayOut = styled.div`
  height: 100%;
  width: 100%;
  background-color: #808080;
`;

const StatusBarGray = () => {
  return (
    <StatusBarContainer>
      <ProgressFillGrayOut />
    </StatusBarContainer>
  );
};

export default StatusBarGray;

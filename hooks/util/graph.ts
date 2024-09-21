import { GenerateDataProps } from "interfaces/graph";
import {
  OneHundred,
  DAYS_IN_YEAR,
  REWARD_BONUS_RATE_VALUE,
} from "constants/graph";
import {
  HoverPositionLowerThreshold,
  HoverPositionUpperThreshold,
  HoverPositionLowerThresholdMobile,
  HoverPositionUpperThresholdMobile,
} from "constants/graph";
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";
export const calculateY = (
  x: number,
  rate1: number,
  rate2: number,
  threshold: number,
) => {
  return x < threshold
    ? x * rate1
    : threshold * rate1 + (x - threshold) * rate2;
};

export const generateData = (props: GenerateDataProps) => {
  const data = [];
  for (let i = 0; i <= 100; i++) {
    const earnValue = Math.min(
      100,
      Math.max(
        0,
        calculateY(
          i,
          props.dataKeys.earn.supplyRateSlopeLow,
          props.dataKeys.earn.supplyRateSlopeHigh,
          props.dataKeys.earn.supplyKink,
        ),
      ),
    );
    const borrowValue = Math.min(
      100,
      Math.max(
        0,
        calculateY(
          i,
          props.dataKeys.borrow.borrowRateSlopeLow,
          props.dataKeys.borrow.borrowRateSlopeHigh,
          props.dataKeys.borrow.borrowKink,
        ) + props.dataKeys.borrow.borrowRateBase,
      ),
    );

    data.push({
      utilization: i,
      earnValue,
      borrowValue,
    });
  }
  return data;
};

export const calculateInitialData = (
  utilization: number,
  dataKeys: GenerateDataProps["dataKeys"],
) => ({
  utilization,
  earnValue: calculateY(
    utilization,
    dataKeys.earn.supplyRateSlopeLow,
    dataKeys.earn.supplyRateSlopeHigh,
    dataKeys.earn.supplyKink,
  ),
  borrowValue:
    calculateY(
      utilization,
      dataKeys.borrow.borrowRateSlopeLow,
      dataKeys.borrow.borrowRateSlopeHigh,
      dataKeys.borrow.borrowKink,
    ) + dataKeys.borrow.borrowRateBase,
});

export const calculateYDomain = (
  data: { earnValue: number; borrowValue: number }[],
) => [0, Math.max(...data.map((d) => Math.max(d.earnValue, d.borrowValue)))];

export const getTransform = (
  isMobile: boolean,
  hoverPosition: number | null,
) => {
  if (isMobile) {
    return hoverPosition !== null &&
      hoverPosition < HoverPositionLowerThresholdMobile
      ? "translateX(0%)"
      : hoverPosition !== null &&
          hoverPosition > HoverPositionUpperThresholdMobile
        ? "translateX(-100%)"
        : "translateX(-50%)";
  } else {
    return hoverPosition !== null && hoverPosition < HoverPositionLowerThreshold
      ? "translateX(0%)"
      : hoverPosition !== null && hoverPosition > HoverPositionUpperThreshold
        ? "translateX(-100%)"
        : "translateX(-50%)";
  }
};

export const calculateTotalBalance = (
  balance: number | undefined,
  priceFeedData: PriceFeedData | undefined,
  rate: number | undefined,
) =>
  balance !== undefined &&
  balance > 0 &&
  priceFeedData?.baseAsset !== undefined &&
  priceFeedData.baseAsset > 0 &&
  rate !== undefined &&
  rate > 0
    ? (balance * priceFeedData.baseAsset) / rate
    : 0;

export const calculateRewardData = (
  trackingRewardSpeed: number,
  totalBalance: number,
  rewardAsset: number | undefined,
) =>
  totalBalance > 0
    ? ((trackingRewardSpeed * DAYS_IN_YEAR * (rewardAsset || 0)) /
        totalBalance) *
      OneHundred *
      REWARD_BONUS_RATE_VALUE
    : 0;

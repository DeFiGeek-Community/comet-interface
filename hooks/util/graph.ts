import { GenerateDataProps } from "interfaces/graph";
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

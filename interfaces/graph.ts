export interface DataKeys {
  earn: {
    supplyRateSlopeLow: number;
    supplyRateSlopeHigh: number;
    supplyKink: number;
  };
  borrow: {
    borrowRateSlopeLow: number;
    borrowRateSlopeHigh: number;
    borrowKink: number;
    borrowRateBase: number;
  };
}

export interface GraphModelProps {
  initialUtilization: number;
  dataKeys: DataKeys;
  labels: { borrow: string; earn: string };
}

export interface GenerateDataProps {
  dataKeys: DataKeys;
}
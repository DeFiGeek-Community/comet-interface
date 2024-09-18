import { PoolConfig } from "interfaces/pool";

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
  dataKeys: DataKeys;
  labels: { borrow: string; earn: string };
}

export interface GenerateDataProps {
  dataKeys: DataKeys;
}

export interface RenderGraphSectionProps {
  title: string;
  GraphComponent: React.FC<{ poolData: PoolConfig }>;
  poolData: PoolConfig;
}

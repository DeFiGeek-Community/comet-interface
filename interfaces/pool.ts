import { Address } from "abitype";
import { Token } from "interfaces/token";

export interface BaseAsset extends Token {}

export interface CollateralAsset extends Token {
  borrowCollateralFactor: number;
  liquidateCollateralFactor: number;
  liquidationFactor: number;
  LiquidationPenalty: number;
  supplyCap: number;
}

export interface RewardAsset extends Token {}

export interface PoolConfig {
  proxy: Address;
  reward: Address;
  cometDecimals: number;
  baseToken: BaseAsset;
  rewardToken: RewardAsset;
  supplyKink: number;
  supplyPerYearInterestRateSlopeLow: number;
  supplyPerYearInterestRateSlopeHigh: number;
  supplyPerYearInterestRateBase: number;
  borrowKink: number;
  borrowPerYearInterestRateSlopeLow: number;
  borrowPerYearInterestRateSlopeHigh: number;
  borrowPerYearInterestRateBase: number;
  storeFrontPriceFactor: number;
  trackingIndexScale: number;
  baseTrackingRewardSpeed: number;
  rewardKink: number;
  baseMinForRewards: number;
  baseBorrowMin: number;
  targetReserves: number;
  jpyPriceFeed: Address;
  jpyPriceFeedDecimals: number;
  assetConfigs: CollateralAsset[];
}

export interface PoolConfigMap {
  [chainId: number]: { [poolName: string]: PoolConfig };
}

export interface PoolConfigMapForList {
  [poolName: string]: PoolConfig;
}

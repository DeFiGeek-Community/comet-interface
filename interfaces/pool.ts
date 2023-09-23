import { Address } from "abitype";
import { Token } from "interfaces/token";

export interface BaseAsset extends Token {
  priceFeed: Address;
}

export interface CollateralAsset extends Token {
  priceFeed: Address;
  borrowCollateralFactor: number;
  liquidateCollateralFactor: number;
  liquidationFactor: number;
  supplyCap: number;
}

export interface RewardAsset extends Token {
  priceFeed: Address;
}

export interface PoolConfig {
  governor: Address;
  pauseGuardian: Address;
  baseToken: BaseAsset;
  rewardToken: RewardAsset;
  extensionDelegate: Address;
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

  assetConfigs: CollateralAsset[];
}

export interface PoolAddressMap {
  [chainId: number]: {
    [poolName: string]: {
      proxy: Address;
      reward: Address;
    };
  };
}

export interface PoolConfigMap {
  [chainId: number]: { [poolName: string]: PoolConfig };
}

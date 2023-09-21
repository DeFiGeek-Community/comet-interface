import { Address } from "abitype";

export interface Token {
  name: string;
  symbol: string;
  address: Address;
  decimals: number;
}

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

export interface PoolConfig {
  governor: Address;
  pauseGuardian: Address;
  baseToken: BaseAsset;
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

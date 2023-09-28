import { PoolConfigMap } from "interfaces/pool";
import { SupportedChainId } from "./chains";

export const SupportedPoolName = {
  [SupportedChainId.GOERLI]: {
    CJPY: "CJPY",
  },
};

export const POOL_CONFIG_MAP: PoolConfigMap = {
  [SupportedChainId.GOERLI]: {
    [SupportedPoolName[SupportedChainId.GOERLI].CJPY]: {
      governor: "0x0000000000000000000000000000000000000000",
      pauseGuardian: "0x0000000000000000000000000000000000000000",
      baseToken: {
        name: "Convertible JPY Token",
        symbol: "CJPY",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        color: "#00ad92",
        logoURL: "/tokens/CJPY.png",
        priceFeed: "0x0000000000000000000000000000000000000000",
      },
      rewardToken: {
        name: "TenX Community JAPAN",
        symbol: "TXJP",
        address: "0xeb50368411ABC751fFc3216A4f7df7038592d182",
        decimals: 8,
        color: "#bc1c4c",
        logoURL: "/tokens/TXJP.png",
        priceFeed: "0x0000000000000000000000000000000000000000",
      },
      extensionDelegate: "0x0000000000000000000000000000000000000000",
      supplyKink: 90,
      supplyPerYearInterestRateSlopeLow: 0.04,
      supplyPerYearInterestRateSlopeHigh: 0.99,
      supplyPerYearInterestRateBase: 0,
      borrowKink: 90,
      borrowPerYearInterestRateSlopeLow: 0.025,
      borrowPerYearInterestRateSlopeHigh: 0.99,
      borrowPerYearInterestRateBase: 2.75,
      storeFrontPriceFactor: 50,
      trackingIndexScale: 1e15,
      baseTrackingRewardSpeed: 3.726,
      rewardKink: 85,
      baseMinForRewards: 10000000,
      baseBorrowMin: 1,
      targetReserves: 10000000000,

      assetConfigs: [
        {
          name: "TenX Community JAPAN",
          symbol: "TXJP",
          address: "0xeb50368411ABC751fFc3216A4f7df7038592d182",
          decimals: 8,
          color: "#bc1c4c",
          logoURL: "/tokens/TXJP.png",
          priceFeed: "0x0000000000000000000000000000000000000000",
          borrowCollateralFactor: 80,
          liquidateCollateralFactor: 90,
          liquidationFactor: 90,
          supplyCap: 100000,
        },
        {
          name: "Wrapped st ETH",
          symbol: "wstETH",
          address: "0x0000000000000000000000000000000000000000",
          decimals: 18,
          color: "#627EEA",
          logoURL: "/tokens/ethereum_logo.png",
          priceFeed: "0x0000000000000000000000000000000000000000",
          borrowCollateralFactor: 85,
          liquidateCollateralFactor: 95,
          liquidationFactor: 95,
          supplyCap: 50000,
        },
      ],
    },
  },
};

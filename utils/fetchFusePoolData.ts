import { TokenData } from "../hooks/useTokenData";

export interface FuseAsset {
  cToken: string;

  borrowBalance: number;
  supplyBalance: number;
  liquidity: number;

  underlyingName: string;
  underlyingSymbol: string;
  underlyingToken: string;
  underlyingDecimals: number;
  underlyingPrice: number;
  underlyingBalance: number;

  reserveFactor: number;

  adminFee: number;
  fuseFee: number;
  oracle: string;

  borrowRatePerBlock: number;
  supplyRatePerBlock: number;

  totalBorrow: number;
  totalSupply: number;

  isBaseToken: boolean;
  rewardTokensData: string;
  collateralFactor: number;
  liquidationFactor: number;
  liquidationPenalty: number;
}

export interface USDPricedFuseAsset extends FuseAsset {
  supplyBalanceUSD: number;
  borrowBalanceUSD: number;

  totalSupplyUSD: number;
  totalBorrowUSD: number;

  liquidityUSD: number;

  isPaused: boolean;

  isBaseToken: boolean;
  rewardTokensData: string;
}

export interface USDPricedFuseAssetWithTokenData extends USDPricedFuseAsset {
  tokenData: TokenData;
}

export interface FusePoolData {
  assets: USDPricedFuseAssetWithTokenData[] | USDPricedFuseAsset[];
  comptroller: any;
  address: string;
  name: any;
  baseToken: string;
  oracle: string;
  oracleModel: string | undefined;
  isPrivate: boolean;
  totalLiquidityUSD: any;
  totalSuppliedUSD: any;
  totalBorrowedUSD: any;
  totalSupplyBalanceUSD: any;
  totalBorrowBalanceUSD: any;
  id?: number;
  admin: string;
  isAdminWhitelisted: boolean;
}

export enum FusePoolMetric {
  TotalLiquidityUSD,
  TotalSuppliedUSD,
  TotalBorrowedUSD,
}
export interface CTokenRewardsDistributorIncentivesWithRates
  extends CTokenRewardsDistributorIncentives {
  supplyAPY: number;
  borrowAPY: number;
  supplyAPR: number;
  borrowAPR: number;
}

export interface CTokenRewardsDistributorIncentivesWithRatesMap {
  [cTokenAddress: string]: CTokenRewardsDistributorIncentivesWithRates[];
}

export interface CTokenRewardsDistributorIncentives {
  rewardsDistributorAddress: string;
  rewardToken: string;
  borrowSpeed: number;
  supplySpeed: number;
}

export interface CTokenIncentivesMap {
  [cTokenAddress: string]: CTokenRewardsDistributorIncentives[];
}

// Maps a rewardsDistributor to an array of all its ctokenaddresses
export interface RewardsDistributorCTokensMap {
  [rewardsDistributorAddress: string]: string[];
}

export interface IncentivesData {
  hasIncentives: boolean;
  incentives: CTokenRewardsDistributorIncentivesWithRatesMap;
  rewardsDistributorCtokens: RewardsDistributorCTokensMap;
  rewardTokensData: TokensDataMap;
}

export interface TokensDataMap {
  [address: string]: TokenData;
}

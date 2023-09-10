import { TokenData } from "../hooks/useTokenData";

export interface FuseAsset {
  cToken: string;

  borrowBalance: number;
  supplyBalance: number;
  liquidity: number;

  membership: boolean;

  underlyingName: string;
  underlyingSymbol: string;
  underlyingToken: string;
  underlyingDecimals: number;
  underlyingPrice: number;
  underlyingBalance: number;

  collateralFactor: number;
  reserveFactor: number;

  adminFee: number;
  fuseFee: number;
  oracle: string;

  borrowRatePerBlock: number;
  supplyRatePerBlock: number;

  totalBorrow: number;
  totalSupply: number;
}

export interface USDPricedFuseAsset extends FuseAsset {
  supplyBalanceUSD: number;
  borrowBalanceUSD: number;

  totalSupplyUSD: number;
  totalBorrowUSD: number;

  liquidityUSD: number;

  isPaused: boolean;
}

export interface USDPricedFuseAssetWithTokenData extends USDPricedFuseAsset {
  tokenData: TokenData;
}

export interface FusePoolData {
  assets: USDPricedFuseAssetWithTokenData[] | USDPricedFuseAsset[];
  comptroller: any;
  name: any;
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

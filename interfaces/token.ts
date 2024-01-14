import { Address } from "abitype";

export interface Token {
  name: string;
  symbol: string;
  address: Address;
  decimals: number;
  color: string;
  logoURL: string | undefined;
  priceFeed: Address;
  priceFeedDecimals: number;
  isWrappedToken?: boolean;
}

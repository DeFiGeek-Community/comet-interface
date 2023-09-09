import { useMemo } from "react";

export const TOKENS_DATA: TokensData = {
  "0x0000000000000000000000000000000000000000": {
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum Network Token",
    decimals: 18,
    color: "#627EEA",
    overlayTextColor: "#fff",
    logoURL:
      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/64/Ethereum-ETH-icon.png",
  },
  "0x0000000000000000000000000000000000000001": {
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum Network Token",
    decimals: 18,
    color: "#627EEA",
    overlayTextColor: "#fff",
    logoURL:
      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/64/Ethereum-ETH-icon.png",
  },
  // 他のトークンもこの形式で追加できます。
};

export interface TokenData {
  name: string | null;
  symbol: string | null;
  address: string | null;
  decimals: number | null;
  color: string | null;
  overlayTextColor: string | null;
  logoURL: string | null;
}

// このインデックスシグネチャを追加
export interface TokensData {
  [key: string]: TokenData;
}


export const useTokenData = (address: string) => {
  return TOKENS_DATA[address];
};

export const useTokensData = (addresses: string[]) => {
  return useMemo(() => {
    return addresses.map((address) => TOKENS_DATA[address]);
  }, [addresses]);
};

export interface TokensDataMap {
  [address: string]: TokenData;
}

export const useTokensDataAsMap = (addresses: string[] = []): TokensDataMap => {
  return useMemo(() => {
    const ret: TokensDataMap = {};
    addresses.forEach((address) => {
      ret[address] = TOKENS_DATA[address];
    });
    return ret;
  }, [addresses]);
};

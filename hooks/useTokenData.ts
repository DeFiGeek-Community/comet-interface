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
  "0x961dd84059505d59f82ce4fb87d3c09bec65301d": {
    symbol: "TXJP",
    address: "0x961dd84059505d59f82ce4fb87d3c09bec65301d",
    name: "TenX Community JAPAN",
    decimals: 18,
    color: "#bc1c4c",
    overlayTextColor: "#fff",
    logoURL: "/tokens/TXJP.png",
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
  return addresses.map((address) => TOKENS_DATA[address]);
};

export interface TokensDataMap {
  [address: string]: TokenData;
}

export const useTokensDataAsMap = (addresses: string[] = []): TokensDataMap => {
  const ret: TokensDataMap = {};
  addresses.forEach((address) => {
    ret[address] = TOKENS_DATA[address];
  });
  return ret;
};

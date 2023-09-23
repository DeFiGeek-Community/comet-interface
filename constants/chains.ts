import { ChainInfo } from "interfaces/chain";

export const SupportedChainId = {
  MAINNET: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,
};

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    logoUrl: "/token/ethereum_logo.png",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    explorer: "https://goerli.etherscan.io/",
    label: "Goerli",
    logoUrl: "/token/ethereum_logo.png",
    nativeCurrency: { name: "Goerli ETH", symbol: "goerliETH", decimals: 18 },
  },
};

import { ChainInfo } from "interfaces/chain";

export const SupportedChainId = {
  MAINNET: 1,
  SEPOLIA: 11155111,
};

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    logoUrl: "/token/ethereum_logo.png",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.SEPOLIA]: {
    explorer: "https://sepolia.etherscan.io/",
    label: "Sepolia",
    logoUrl: "/token/ethereum_logo.png",
    nativeCurrency: { name: "Sepolia ETH", symbol: "sepoliaETH", decimals: 18 },
  },
};

export const AddressZero = "0x0000000000000000000000000000000000000000";

import { StaticImageData } from "next/image";
import ethereumLogoUrl from "../public/images/ethereum_logo.png";

export const SupportedChainId = {
  MAINNET: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,
};

export interface ChainInfo {
  [chainId: number]: {
    readonly label: string;
    readonly explorer: string;
    readonly blockWaitMsBeforeWarning?: number;
    readonly docs?: string;
    readonly infoLink?: string;
    readonly logoUrl?: StaticImageData;
    readonly rpcUrls?: string[];
    readonly nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    explorer: "https://goerli.etherscan.io/",
    label: "Goerli",
    nativeCurrency: { name: "Goerli ETH", symbol: "goerliETH", decimals: 18 },
  },
};

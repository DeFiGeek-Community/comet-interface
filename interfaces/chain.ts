export interface ChainInfo {
  [chainId: number]: {
    readonly label: string;
    readonly explorer: string;
    readonly blockWaitMsBeforeWarning?: number;
    readonly docs?: string;
    readonly infoLink?: string;
    readonly logoUrl?: string;
    readonly rpcUrls?: string[];
    readonly nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}
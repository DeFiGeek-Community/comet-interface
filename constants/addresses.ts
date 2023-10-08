import { SupportedChainId } from "./chains";
import { PoolAddressMap } from "../interfaces/pool";

export const ADDRESS_MAP: PoolAddressMap = {
  [SupportedChainId.GOERLI]: {
    CJPY: {
      proxy: "0x0000000000000000000000000000000000000000",
      reward: "0x0000000000000000000000000000000000000000",
    },
    USDC: {
      proxy: "0x3EE77595A8459e93C2888b13aDB354017B198188",
      reward: "0xef9e070044d62C38D2e316146dDe92AD02CF2c2c",
    },
  },
};

import { SupportedChainId } from "./chains";
import { PoolAddressMap } from "../interfaces/pool";

export const ADDRESS_MAP: PoolAddressMap = {
  [SupportedChainId.GOERLI]: {
    CJPY: {
      proxy: "0x0000000000000000000000000000000000000000",
      reward: "0x0000000000000000000000000000000000000000",
    },
  },
};

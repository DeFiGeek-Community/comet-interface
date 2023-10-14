import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import cometAbi from "static/comet.json";
import { PoolConfig } from "interfaces/pool";
import { Address } from "abitype";

export const getCometContract = async (address: Address) => {
  const network = getNetwork();
  const walletClient = await getWalletClient({ chainId: network.chain?.id });
  return getContract({
    address: address,
    abi: cometAbi,
    walletClient: walletClient as any,
  });
};

export const fetchDataFromComet = async (
  method: string,
  poolData: PoolConfig,
  asset?: Address,
): Promise<bigint | undefined> => {
  const comet = await getCometContract(poolData.proxy);
  const { address } = getAccount();
  if (!address) return undefined;
  console.log(method);
  const args = asset ? [address, asset] : [address];
  const data = await comet.read[method](args);
  return typeof data === "bigint" ? data : undefined;
};

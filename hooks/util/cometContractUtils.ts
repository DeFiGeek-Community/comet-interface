import usePoolData from "hooks/pool/shared/usePoolConfig";
import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import cometAbi from "statuc/comet.json";
import { Address } from "abitype";

export const getCometContract = async (address: Address) => {
  const network = getNetwork();
  const walletClient = await getWalletClient({ chainId: network.chain?.id });
  return getContract({
    address,
    abi: cometAbi,
    walletClient: walletClient as any,
  });
};

export const fetchDataFromComet = async (
  method: string,
): Promise<number | undefined> => {
  const poolData = usePoolData();
  if (!poolData) return undefined;
  const comet = await getCometContract(poolData.proxy);
  const { address } = getAccount();
  if (!address) return undefined;
  const data = await comet.read[method]([address]);
  return data as number;
};
import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import priceAbi from "static/price.json";
import { Address } from "abitype";
import { AddressZero } from "constants/chains";

export const getPriceFeedContract = async (
  address: Address,
  chainId?: number,
) => {
  const walletClient = await getWalletClient({ chainId: chainId });
  return getContract({
    address: address,
    abi: priceAbi,
    walletClient: walletClient as any,
  });
};

export const fetchPriceFeed = async (
  priceFeedAddress: Address,
  configChainId?: number,
): Promise<bigint | undefined> => {
  if (!priceFeedAddress) return undefined;
  if (priceFeedAddress === AddressZero) return undefined;

  const { address } = getAccount();
  const network = getNetwork();

  if (!address || !network.chain?.id || configChainId !== network.chain.id) {
    return undefined;
  }
  const priceFeed = await getPriceFeedContract(priceFeedAddress);
  const data = (await priceFeed.read.latestRoundData()) as (bigint | number)[];
  return typeof data[1] === "bigint" ? data[1] : undefined;
};

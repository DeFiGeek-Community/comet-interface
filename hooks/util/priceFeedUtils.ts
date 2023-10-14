import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import priceAbi from "static/price.json";
import { Address } from "abitype";

export const getPriceFeedContract = async (address: Address) => {
  const network = getNetwork();
  const walletClient = await getWalletClient({ chainId: network.chain?.id });
  return getContract({
    address: address,
    abi: priceAbi,
    walletClient: walletClient as any,
  });
};

export const fetchPriceFeed = async (
  priceFeedAddress: Address,
): Promise<bigint | undefined> => {
  const priceFeed = await getPriceFeedContract(priceFeedAddress);
  const { address } = getAccount();
  if (!address) return undefined;
  const data = await priceFeed.read.latestRoundData() as (bigint | number)[];
  return typeof data[1] === "bigint" ? data[1] : undefined;
};



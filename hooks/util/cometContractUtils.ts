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
  const args = asset ? [address, asset] : [address];
  const data = await comet.read[method](args);
  return typeof data === "bigint" ? data : undefined;
};

export const fetchTotalDataComet = async (
  method: string,
  poolData: PoolConfig,
): Promise<bigint | undefined> => {
  const comet = await getCometContract(poolData.proxy);
  const { address } = getAccount();
  if (!address) return undefined;
  const data = await comet.read[method]();
  return typeof data === "bigint" ? data : undefined;
};

export const fetchTotalCollateralDataComet = async (
  method: string,
  poolData: PoolConfig,
  asset: Address,
): Promise<bigint | undefined> => {
  if(!asset) return undefined;
  const comet = await getCometContract(poolData.proxy);
  const { address } = getAccount();
  if (!address) return undefined;
  const data = (await comet.read[method]([asset])) as (bigint | number)[];
  return typeof data[0] === "bigint" ? data[0] : undefined;
};

export const fetchRateDataComet = async (
  method: string,
  poolData: PoolConfig,
  utilization: bigint | undefined,
): Promise<bigint | undefined> => {
  const comet = await getCometContract(poolData.proxy);
  const { address } = getAccount();
  if (!address) return undefined;
  if (utilization === undefined) return undefined;
  const data = (await comet.read[method]([utilization])) as (bigint | number)[];
  return typeof data === "bigint" ? data : undefined;
};

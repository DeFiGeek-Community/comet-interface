import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import cometAbi from "static/comet.json";
import { PoolConfig } from "interfaces/pool";
import { Address } from "abitype";

async function getValidatedCometContract(
  poolData: PoolConfig,
): Promise<any | undefined> {
  const { address } = getAccount();
  const network = getNetwork();
  const chainId = network.chain?.id;

  if (!address || chainId !== poolData.chainId) {
    return undefined;
  }

  return getContract({
    address: poolData.proxy,
    abi: cometAbi,
    walletClient: (await getWalletClient({ chainId })) as any,
  });
}
export const fetchDataFromComet = async (
  method: string,
  poolData: PoolConfig,
  asset?: Address,
): Promise<bigint | undefined> => {
  const comet = await getValidatedCometContract(poolData);
  if (!comet) return undefined;
  const { address } = getAccount();
  const args = asset ? [address, asset] : [address];
  const data = await comet.read[method](args);
  return typeof data === "bigint" ? data : undefined;
};

export const fetchTotalDataComet = async (
  method: string,
  poolData: PoolConfig,
): Promise<bigint | undefined> => {
  const comet = await getValidatedCometContract(poolData);
  if (!comet) return undefined;
  const data = await comet.read[method]();
  return typeof data === "bigint" ? data : undefined;
};

export const fetchTotalCollateralDataComet = async (
  method: string,
  poolData: PoolConfig,
  asset: Address,
): Promise<bigint | undefined> => {
  const comet = await getValidatedCometContract(poolData);
  if (!comet) return undefined;
  const data = (await comet.read[method]([asset])) as (bigint | number)[];
  return typeof data[0] === "bigint" ? data[0] : undefined;
};

export const fetchRateDataComet = async (
  method: string,
  poolData: PoolConfig,
  utilization: bigint | undefined,
): Promise<bigint | undefined> => {
  if (utilization === undefined) return undefined;
  const comet = await getValidatedCometContract(poolData);
  if (!comet) return undefined;
  const data = (await comet.read[method]([utilization])) as (bigint | number)[];
  return typeof data === "bigint" ? data : undefined;
};

import { useState, useEffect } from "react";
import { PoolConfig } from "interfaces/pool";
import {
  getAccount,
  getContract,
  getNetwork,
  getWalletClient,
} from "@wagmi/core";
import usePoolData from "hooks/pool/shared/usePoolConfig";
import cometAbi from "statuc/comet.json";
import { Address } from "abitype";

interface BaseAssetData {
  supplyAPR: number | undefined;
  yourSupply: number | undefined;
  borrowAPR: number | undefined;
  yourBorrow: number | undefined;
  availableToBorrow: number | undefined;
}

const getCometContract = async (address: Address) => {
  const network = getNetwork();
  const walletClient = await getWalletClient({ chainId: network.chain?.id });
  return getContract({
    address,
    abi: cometAbi,
    walletClient: walletClient as any,
  });
};

const fetchDataFromComet = async (
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

export const fetchSupplyAPR = async () => undefined;

export const fetchYourSupply = async () => fetchDataFromComet("balanceOf");

export const fetchBorrowAPR = async () => undefined;

export const fetchYourBorrow = async () =>
  fetchDataFromComet("borrowBalanceOf");

export const fetchAvailableToBorrow = async () => undefined;

const useBaseAssetData = (poolData: PoolConfig | undefined) => {
  const [baseAssetData, setBaseAssetData] = useState<BaseAssetData>();
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchBaseAsset = async () => {
      try {
        const [
          supplyAPR,
          yourSupply,
          borrowAPR,
          yourBorrow,
          availableToBorrow,
        ] = await Promise.all([
          fetchSupplyAPR(),
          fetchYourSupply(),
          fetchBorrowAPR(),
          fetchYourBorrow(),
          fetchAvailableToBorrow(),
        ]);

        setBaseAssetData({
          supplyAPR,
          yourSupply,
          borrowAPR,
          yourBorrow,
          availableToBorrow,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    fetchBaseAsset();
  }, [poolData, reloadKey]);

  const reload = () => setReloadKey((prevKey) => prevKey + 1);

  return { baseAssetData, error, reload };
};

export default useBaseAssetData;

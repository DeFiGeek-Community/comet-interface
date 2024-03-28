// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useEffect } from "react";
import PoolListDataContext from "context/PoolListDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { useAppData } from "context/AppDataContext";
import { PoolConfigMapForList } from "interfaces/pool";

interface PoolListDataProviderProps {
  poolDatas: PoolConfigMapForList | undefined;
  children: React.ReactNode;
}

export const PoolListDataProvider: React.FC<PoolListDataProviderProps> = ({
  poolDatas,
  children,
}) => {
  const {
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();

  const objCJPY = poolDatas?.["CJPY"];
  const { priceFeedData: priceFeedDataCJPY } = usePriceFeedData(objCJPY);
  const { totalPoolData: totalPoolDataCJPY } = useTotalPoolData(objCJPY);
  const objUSDC = poolDatas?.["USDC"];
  const { priceFeedData: priceFeedDataUSDC } = usePriceFeedData(objUSDC);
  const { totalPoolData: totalPoolDataUSDC } = useTotalPoolData(objUSDC);
  const objcrvUSD = poolDatas?.["crvUSD"];
  const { priceFeedData: priceFeedDatacrvUSD } = usePriceFeedData(objcrvUSD);
  const { totalPoolData: totalPoolDatacrvUSD } = useTotalPoolData(objcrvUSD);
  const objWETH = poolDatas?.["WETH"];
  const { priceFeedData: priceFeedDataWETH } = usePriceFeedData(objWETH);
  const { totalPoolData: totalPoolDataWETH } = useTotalPoolData(objWETH);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (
      priceObject["CJPY"] === undefined &&
      priceFeedDataCJPY?.usdjpy !== undefined
    ) {
      updatePriceFeedData("CJPY", priceFeedDataCJPY);
      console.log("Yes!");
    }
  }, [priceFeedDataCJPY, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (
      totalPoolObject["CJPY"] === undefined &&
      totalPoolDataCJPY?.totalBaseSupplyBalance !== undefined
    ) {
      updateTotalPoolData("CJPY", totalPoolDataCJPY);
    }
  }, [totalPoolDataCJPY, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (
      priceObject["USDC"] === undefined &&
      priceFeedDataUSDC?.usdjpy !== undefined
    ) {
      updatePriceFeedData("USDC", priceFeedDataUSDC);
    }
  }, [priceFeedDataUSDC, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (
      totalPoolObject["USDC"] === undefined &&
      totalPoolDataUSDC?.totalBaseSupplyBalance !== undefined
    ) {
      updateTotalPoolData("USDC", totalPoolDataUSDC);
    }
  }, [totalPoolDataUSDC, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (
      priceObject["crvUSD"] === undefined &&
      priceFeedDatacrvUSD?.usdjpy !== undefined
    ) {
      updatePriceFeedData("crvUSD", priceFeedDatacrvUSD);
    }
  }, [priceFeedDatacrvUSD, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (
      totalPoolObject["crvUSD"] === undefined &&
      totalPoolDatacrvUSD?.totalBaseSupplyBalance !== undefined
    ) {
      updateTotalPoolData("crvUSD", totalPoolDatacrvUSD);
    }
  }, [totalPoolDatacrvUSD, totalPoolObject, updateTotalPoolData]);

  useEffect(() => {
    // priceFeedData が priceObject にない場合のみ更新する
    if (
      priceObject["WETH"] === undefined &&
      priceFeedDataWETH?.usdjpy !== undefined
    ) {
      updatePriceFeedData("WETH", priceFeedDataWETH);
    }
  }, [priceFeedDataWETH, priceObject, updatePriceFeedData]);
  useEffect(() => {
    // totalPoolData が totalPoolObject にない場合のみ更新する
    if (
      totalPoolObject["WETH"] === undefined &&
      totalPoolDataWETH?.totalBaseSupplyBalance !== undefined
    ) {
      updateTotalPoolData("WETH", totalPoolDataWETH);
    }
  }, [totalPoolDataWETH, totalPoolObject, updateTotalPoolData]);

  return (
    <PoolListDataContext.Provider
      value={{
        priceFeedData: priceObject,
        totalPoolData: totalPoolObject,
      }}
    >
      {children}
    </PoolListDataContext.Provider>
  );
};

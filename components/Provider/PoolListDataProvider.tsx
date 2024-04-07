// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useEffect } from "react";
import PoolListDataContext from "context/PoolListDataContext";
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useBaseAsset from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssets from "hooks/pool/indivisual/useCollateralAssets";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { useAppData } from "context/AppDataContext";
import { useChainForPoolList } from "context/ChainForPoolListContext";
import { PoolConfigMapForList } from "interfaces/pool";
import usePoolConfigForPoolList from "hooks/pool/list/usePoolConfigForPoolList";

interface PoolListDataProviderProps {
  poolDatas: PoolConfigMapForList | undefined;
  children: React.ReactNode;
}

export const PoolListDataProvider: React.FC<PoolListDataProviderProps> = ({
  poolDatas,
  children,
}) => {
  const {
    isSameChainForPriceFeedDataOnCJPY,
    isSameChainForTotalPoolDataOnCJPY,
    isSameChainForPriceFeedDataOnUSDC,
    isSameChainForTotalPoolDataOnUSDC,
    isSameChainForPriceFeedDataOncrvUSD,
    isSameChainForTotalPoolDataOncrvUSD,
    isSameChainForPriceFeedDataOnWETH,
    isSameChainForTotalPoolDataOnWETH,
    setIsSameChainForPriceFeedDataOnCJPY,
    setIsSameChainForTotalPoolDataOnCJPY,
    setIsSameChainForPriceFeedDataOnUSDC,
    setIsSameChainForTotalPoolDataOnUSDC,
    setIsSameChainForPriceFeedDataOncrvUSD,
    setIsSameChainForTotalPoolDataOncrvUSD,
    setIsSameChainForPriceFeedDataOnWETH,
    setIsSameChainForTotalPoolDataOnWETH,
  } = useChainForPoolList();
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
    if (isSameChainForPriceFeedDataOnCJPY) {
      // priceFeedData が priceObject にない場合のみ更新する
      if (
        priceObject["CJPY"] === undefined &&
        priceFeedDataCJPY?.usdjpy !== undefined
      ) {
        updatePriceFeedData("CJPY", priceFeedDataCJPY);
        console.log("Yes!");
      }
    } else {
      if (priceFeedDataCJPY?.usdjpy !== undefined) {
        updatePriceFeedData("CJPY", priceFeedDataCJPY);
        setIsSameChainForPriceFeedDataOnCJPY(true);
        console.log("Hey!");
      }
    }
  }, [
    priceFeedDataCJPY,
    priceObject,
    updatePriceFeedData,
    isSameChainForPriceFeedDataOnCJPY,
    setIsSameChainForPriceFeedDataOnCJPY,
  ]);
  useEffect(() => {
    if (isSameChainForTotalPoolDataOnCJPY) {
      // totalPoolData が totalPoolObject にない場合のみ更新する
      if (
        totalPoolObject["CJPY"] === undefined &&
        totalPoolDataCJPY?.totalBaseSupplyBalance !== undefined
      ) {
        updateTotalPoolData("CJPY", totalPoolDataCJPY);
      }
    } else {
      if (totalPoolDataCJPY?.totalBaseSupplyBalance !== undefined) {
        updateTotalPoolData("CJPY", totalPoolDataCJPY);
        setIsSameChainForTotalPoolDataOnCJPY(true);
      }
    }
  }, [
    totalPoolDataCJPY,
    totalPoolObject,
    updateTotalPoolData,
    isSameChainForTotalPoolDataOnCJPY,
    setIsSameChainForTotalPoolDataOnCJPY,
  ]);

  useEffect(() => {
    if (isSameChainForPriceFeedDataOnUSDC) {
      // priceFeedData が priceObject にない場合のみ更新する
      if (
        priceObject["USDC"] === undefined &&
        priceFeedDataUSDC?.usdjpy !== undefined
      ) {
        updatePriceFeedData("USDC", priceFeedDataUSDC);
      }
    } else {
      if (priceFeedDataUSDC?.usdjpy !== undefined) {
        updatePriceFeedData("USDC", priceFeedDataUSDC);
        setIsSameChainForPriceFeedDataOnUSDC(true);
      }
    }
  }, [
    priceFeedDataUSDC,
    priceObject,
    updatePriceFeedData,
    isSameChainForPriceFeedDataOnUSDC,
    setIsSameChainForPriceFeedDataOnUSDC,
  ]);
  useEffect(() => {
    if (isSameChainForTotalPoolDataOnUSDC) {
      // totalPoolData が totalPoolObject にない場合のみ更新する
      if (
        totalPoolObject["USDC"] === undefined &&
        totalPoolDataUSDC?.totalBaseSupplyBalance !== undefined
      ) {
        updateTotalPoolData("USDC", totalPoolDataUSDC);
      }
    } else {
      if (totalPoolDataUSDC?.totalBaseSupplyBalance !== undefined) {
        updateTotalPoolData("USDC", totalPoolDataUSDC);
        setIsSameChainForTotalPoolDataOnUSDC(true);
      }
    }
  }, [
    totalPoolDataUSDC,
    totalPoolObject,
    updateTotalPoolData,
    isSameChainForTotalPoolDataOnUSDC,
    setIsSameChainForTotalPoolDataOnUSDC,
  ]);

  useEffect(() => {
    if (isSameChainForPriceFeedDataOncrvUSD) {
      // priceFeedData が priceObject にない場合のみ更新する
      if (
        priceObject["crvUSD"] === undefined &&
        priceFeedDatacrvUSD?.usdjpy !== undefined
      ) {
        updatePriceFeedData("crvUSD", priceFeedDatacrvUSD);
      }
    } else {
      if (priceFeedDatacrvUSD?.usdjpy !== undefined) {
        updatePriceFeedData("crvUSD", priceFeedDatacrvUSD);
        setIsSameChainForPriceFeedDataOncrvUSD(true);
      }
    }
  }, [
    priceFeedDatacrvUSD,
    priceObject,
    updatePriceFeedData,
    isSameChainForPriceFeedDataOncrvUSD,
    setIsSameChainForPriceFeedDataOncrvUSD,
  ]);
  useEffect(() => {
    if (isSameChainForTotalPoolDataOncrvUSD) {
      // totalPoolData が totalPoolObject にない場合のみ更新する
      if (
        totalPoolObject["crvUSD"] === undefined &&
        totalPoolDatacrvUSD?.totalBaseSupplyBalance !== undefined
      ) {
        updateTotalPoolData("crvUSD", totalPoolDatacrvUSD);
      }
    } else {
      if (totalPoolDatacrvUSD?.totalBaseSupplyBalance !== undefined) {
        updateTotalPoolData("crvUSD", totalPoolDatacrvUSD);
        setIsSameChainForTotalPoolDataOncrvUSD(true);
      }
    }
  }, [
    totalPoolDatacrvUSD,
    totalPoolObject,
    updateTotalPoolData,
    isSameChainForTotalPoolDataOncrvUSD,
    setIsSameChainForTotalPoolDataOncrvUSD,
  ]);

  useEffect(() => {
    if (isSameChainForPriceFeedDataOnWETH) {
      // priceFeedData が priceObject にない場合のみ更新する
      if (
        priceObject["WETH"] === undefined &&
        priceFeedDataWETH?.usdjpy !== undefined
      ) {
        updatePriceFeedData("WETH", priceFeedDataWETH);
      }
    } else {
      if (priceFeedDataWETH?.usdjpy !== undefined) {
        updatePriceFeedData("WETH", priceFeedDataWETH);
        setIsSameChainForPriceFeedDataOnWETH(true);
      }
    }
  }, [
    priceFeedDataWETH,
    priceObject,
    updatePriceFeedData,
    isSameChainForPriceFeedDataOnWETH,
    setIsSameChainForPriceFeedDataOnWETH,
  ]);
  useEffect(() => {
    if (isSameChainForTotalPoolDataOnWETH) {
      // totalPoolData が totalPoolObject にない場合のみ更新する
      if (
        totalPoolObject["WETH"] === undefined &&
        totalPoolDataWETH?.totalBaseSupplyBalance !== undefined
      ) {
        updateTotalPoolData("WETH", totalPoolDataWETH);
      }
    } else {
      if (totalPoolDataWETH?.totalBaseSupplyBalance !== undefined) {
        updateTotalPoolData("WETH", totalPoolDataWETH);
        setIsSameChainForTotalPoolDataOnWETH(true);
      }
    }
  }, [
    totalPoolDataWETH,
    totalPoolObject,
    updateTotalPoolData,
    isSameChainForTotalPoolDataOnWETH,
    setIsSameChainForTotalPoolDataOnWETH,
  ]);

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

// components/Provider/PoolPrimaryDataProvider.tsx
import React, { useState, useEffect } from "react";
import ChainForPoolListContext from "context/ChainForPoolListContext";

interface ChainForPoolListProviderProps {
  chainId: number | undefined;
  children: React.ReactNode;
}

export const ChainForPoolListProvider: React.FC<
  ChainForPoolListProviderProps
> = ({ chainId, children }) => {
  const [prevChainId, setPrevChainId] = useState<number>(1);
  const [
    isSameChainForPriceFeedDataOnCJPY,
    setIsSameChainForPriceFeedDataOnCJPY,
  ] = useState<boolean>(true);
  const [
    isSameChainForTotalPoolDataOnCJPY,
    setIsSameChainForTotalPoolDataOnCJPY,
  ] = useState<boolean>(true);
  const [
    isSameChainForPriceFeedDataOnUSDC,
    setIsSameChainForPriceFeedDataOnUSDC,
  ] = useState<boolean>(true);
  const [
    isSameChainForTotalPoolDataOnUSDC,
    setIsSameChainForTotalPoolDataOnUSDC,
  ] = useState<boolean>(true);
  const [
    isSameChainForPriceFeedDataOncrvUSD,
    setIsSameChainForPriceFeedDataOncrvUSD,
  ] = useState<boolean>(true);
  const [
    isSameChainForTotalPoolDataOncrvUSD,
    setIsSameChainForTotalPoolDataOncrvUSD,
  ] = useState<boolean>(true);
  const [
    isSameChainForPriceFeedDataOnWETH,
    setIsSameChainForPriceFeedDataOnWETH,
  ] = useState<boolean>(true);
  const [
    isSameChainForTotalPoolDataOnWETH,
    setIsSameChainForTotalPoolDataOnWETH,
  ] = useState<boolean>(true);

  if (chainId && chainId !== prevChainId) {
    setPrevChainId(chainId);
    setIsSameChainForPriceFeedDataOnCJPY(false);
    setIsSameChainForTotalPoolDataOnCJPY(false);
    setIsSameChainForPriceFeedDataOnUSDC(false);
    setIsSameChainForTotalPoolDataOnUSDC(false);
    setIsSameChainForPriceFeedDataOncrvUSD(false);
    setIsSameChainForTotalPoolDataOncrvUSD(false);
    setIsSameChainForPriceFeedDataOnWETH(false);
    setIsSameChainForTotalPoolDataOnWETH(false);
  }

  return (
    <ChainForPoolListContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChainForPoolListContext.Provider>
  );
};

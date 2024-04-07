import React, { createContext, useContext } from "react";

export interface ChainForPoolListContextType {
  isSameChainForPriceFeedDataOnCJPY:boolean;
  isSameChainForTotalPoolDataOnCJPY:boolean;
  isSameChainForPriceFeedDataOnUSDC:boolean;
  isSameChainForTotalPoolDataOnUSDC:boolean;
  isSameChainForPriceFeedDataOncrvUSD:boolean;
  isSameChainForTotalPoolDataOncrvUSD:boolean;
  isSameChainForPriceFeedDataOnWETH:boolean;
  isSameChainForTotalPoolDataOnWETH:boolean;
  setIsSameChainForPriceFeedDataOnCJPY(isSmaeChain:boolean):void;
  setIsSameChainForTotalPoolDataOnCJPY(isSmaeChain:boolean):void;
  setIsSameChainForPriceFeedDataOnUSDC(isSmaeChain:boolean):void;
  setIsSameChainForTotalPoolDataOnUSDC(isSmaeChain:boolean):void;
  setIsSameChainForPriceFeedDataOncrvUSD(isSmaeChain:boolean):void;
  setIsSameChainForTotalPoolDataOncrvUSD(isSmaeChain:boolean):void;
  setIsSameChainForPriceFeedDataOnWETH(isSmaeChain:boolean):void;
  setIsSameChainForTotalPoolDataOnWETH(isSmaeChain:boolean):void;
}

export const ChainForPoolListContext = createContext<ChainForPoolListContextType | undefined>(
  undefined,
);

export const useChainForPoolList = () => {
  const context = useContext(ChainForPoolListContext);
  if (context === undefined) {
    throw new Error("useChainForPoolList must be used within a AppDataProvider");
  }
  return context;
};

export default ChainForPoolListContext;

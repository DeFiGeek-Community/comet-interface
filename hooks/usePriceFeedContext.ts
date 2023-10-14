import { useContext } from "react";
import PriceFeedContext from 'context/PriceFeedContext';

export const usePriceFeedContext = () => {
  const context = useContext(PriceFeedContext);

  if (!context) {
    throw new Error("usePriceFeedContext must be used within a PriceFeedProvider");
  }

  return context;
};

import React from 'react';
import { PriceFeedData } from "hooks/pool/shared/usePriceFeed";

interface PriceFeedContextType {
  priceFeedData: PriceFeedData | undefined;
}

const PriceFeedContext = React.createContext<PriceFeedContextType | undefined>(undefined);

export default PriceFeedContext;

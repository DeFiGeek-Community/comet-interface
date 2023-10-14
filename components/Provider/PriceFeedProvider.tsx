import PriceFeedContext from 'context/PriceFeedContext';
import { PoolConfig } from "interfaces/pool";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";

interface PriceFeedProviderProps {
  poolData: PoolConfig | undefined;
  children: any;
}

export const PriceFeedProvider: React.FC<PriceFeedProviderProps> = ({ poolData, children }) => {
  const { priceFeedData } = usePriceFeedData(poolData);

  return (
    <PriceFeedContext.Provider value={{ priceFeedData }}>
      {children}
    </PriceFeedContext.Provider>
  );
};

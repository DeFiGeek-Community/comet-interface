import { useEffect } from "react";
import { useAppData } from "context/AppDataContext";
import usePoolConfigForPoolList from "hooks/pool/list/usePoolConfigForPoolList";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

export const useUpdatePoolData = () => {
  const {
    priceFeedData: priceObject,
    updatePriceFeedData,
    totalPoolData: totalPoolObject,
    updateTotalPoolData,
  } = useAppData();

  const config = usePoolConfigForPoolList();

  if (!config) return;

  const poolNames = Object.keys(config);

  for (const poolName of poolNames) {
    const poolConfig = config[poolName];
    const { priceFeedData } = usePriceFeedData(poolConfig);

    useEffect(() => {
      // priceFeedData が priceObject にない場合のみ更新する
      if (priceFeedData && priceObject[poolName] !== priceFeedData) {
        updatePriceFeedData(poolName, priceFeedData);
      }
    }, [config, priceFeedData, updatePriceFeedData]);

    const { totalPoolData } = useTotalPoolData(poolConfig);

    useEffect(() => {
      // totalPoolData が totalPoolObject にない場合のみ更新する
      if (totalPoolData && totalPoolObject[poolName] !== totalPoolData) {
        updateTotalPoolData(poolName, totalPoolData);
      }
    }, [config, totalPoolData, updateTotalPoolData]);
  }

  
};

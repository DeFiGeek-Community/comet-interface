import { useEffect, useState } from "react";
import { OneHundred } from "constants/graph";

const useInitialUtilization = (totalPoolData: any) => {
  const [initialUtilization, setInitialUtilization] = useState(0);

  useEffect(() => {
    let utilizationValue: number | undefined;
    if (
      totalPoolData?.totalBaseBorrowBalance &&
      totalPoolData?.totalBaseSupplyBalance
    ) {
      utilizationValue =
        (totalPoolData?.totalBaseBorrowBalance /
          totalPoolData?.totalBaseSupplyBalance) *
        OneHundred;
    } else if (totalPoolData?.totalBaseBorrowBalance === 0) {
      utilizationValue = 0;
    }
    setInitialUtilization(utilizationValue ?? 0);
  }, [totalPoolData]);

  return initialUtilization;
};

export default useInitialUtilization;

import { useEffect, useState } from "react";
import usePoolData from "hooks/pool/usePoolData";
import { OneHundred } from "constants/graph";

const useInitialUtilization = () => {
  const { totalPoolData } = usePoolData();
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

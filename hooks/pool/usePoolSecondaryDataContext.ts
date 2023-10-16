import { useContext } from "react";
import PoolSecondaryDataContext from "context/PoolSecondaryDataContext";

export const usePoolSecondaryDataContext = () => {
  const context = useContext(PoolSecondaryDataContext);

  if (!context) {
    throw new Error(
      "usePoolSecondaryDataContext must be used within a PoolSecondaryDataProvider",
    );
  }

  return context;
};

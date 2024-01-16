import { useContext } from "react";
import PoolAllTotalDataContext from "context/PoolAllTotalDataContext";

export const usePoolAllTotalDataContext = () => {
  const context = useContext(PoolAllTotalDataContext);

  if (!context) {
    throw new Error(
      "usePoolAllTotalDataContext must be used within a PoolAllTotalDataProvider",
    );
  }

  return context;
};

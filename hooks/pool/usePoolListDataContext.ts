import { useContext } from "react";
import PoolListDataContext from "context/PoolListDataContext";

export const usePoolListDataContext = () => {
  const context = useContext(PoolListDataContext);

  if (!context) {
    throw new Error(
      "usePoolListDataContext must be used within a PoolListDataProvider",
    );
  }

  return context;
};

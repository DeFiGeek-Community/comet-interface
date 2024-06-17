import { useContext } from "react";
import { PoolDataContext } from "context/PoolDataContext";

const usePoolData = () => {
  const context = useContext(PoolDataContext);
  if (!context) {
    throw new Error("usePool must be used within a ChainPoolProvider");
  }
  return context;
};

export default usePoolData;

import { useContext } from "react";
import { PoolContext } from "context/PoolContext";

const usePool = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("usePool must be used within a ChainPoolProvider");
  }
  return context;
};

export default usePool;

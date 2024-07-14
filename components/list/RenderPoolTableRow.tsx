import React from "react";
import PoolTableRow from "components/list/PoolTableRow";
import { useAppData } from "context/AppDataContext";
import { PoolDataProvider } from "components/Provider/PoolDataProvider";

const RenderPoolTableRow = () => {
  const { config: poolsConfig } = useAppData();
  if (!poolsConfig) return;

  return Object.values(poolsConfig).map((data, index) => {
    if (data.baseToken) {
      return (
        <PoolDataProvider poolData={data} key={index}>
          <PoolTableRow poolData={data} key={index} />
        </PoolDataProvider>
      );
    }
  });
};

RenderPoolTableRow.displayName = "RenderPoolTableRow";

export default RenderPoolTableRow;

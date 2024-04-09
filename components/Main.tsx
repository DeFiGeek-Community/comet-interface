import React from "react";
import { useAppData } from "context/AppDataContext";
import PoolList from "./PoolList";
import PoolPage from "./PoolPage";

const Main = () => {
  const { pageName } = useAppData();

  return (
    <>
      {pageName === "list" && <PoolList />}
      {pageName === "pool" && <PoolPage />}
    </>
  );
};

export default Main;

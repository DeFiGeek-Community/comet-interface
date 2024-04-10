import StatsBar from "components/pool/StatsBar";
import PoolTable from "components/list/PoolTable";

const PoolList = () => {
  return (
    <>
      <StatsBar isPoolList={true} />
      <PoolTable />
    </>
  );
};

PoolList.displayName = "PoolList";

export default PoolList;

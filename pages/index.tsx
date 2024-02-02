import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolList from "components/PoolList";
import { useRouter } from "next/router";
import { PoolAllTotalDataProvider } from "components/Provider/PoolAllTotalDataProvider";

const Pool = () => {
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <PoolAllTotalDataProvider>
      {isRendered && router.isReady ? (
        <PoolList />
      ) : (
        <Center height="100vh">
          <HashLoader color="#FFF" />
        </Center>
      )}
    </PoolAllTotalDataProvider>
  );
};

export default Pool;

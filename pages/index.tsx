import React, { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolList from "components/PoolList";
import { ReloadContextProvider } from "components/Provider/ReloadContextProvider";
import { PoolContext } from "context/PoolContext";
import { useRouter } from "next/router";

const Pool = () => {
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <>
        {isRendered && router.isReady ? (
          <PoolList />
        ) : (
          <Center height="100vh">
            <HashLoader color="#FFF" />
          </Center>
        )}
    </>  
  );
};

export default Pool;

import React, { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { HashLoader } from "react-spinners";
import { Center } from "utils/chakraUtils";
import PoolPage from "components/PoolPage";
import { PoolContext } from 'context/PoolContext';

const Pool = () => {
  const { chain } = useNetwork();
  const [chainId, setChainId] = useState<number>(1);
  const [poolName, setPoolName] = useState<string>('CJPY');

  useEffect(() => {
    if(chain){
      setChainId(chain.id);
    }
  }, [chain]);

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <PoolContext.Provider value={{ chainId, poolName, setChainId, setPoolName }}>
      {isRendered ? (
        <PoolPage />
      ) : (
        <Center height="100vh">
          <HashLoader color="#FFF" />
        </Center>
      )}
    </PoolContext.Provider>
  );
};

export default Pool;

import React, { memo, useEffect } from "react";
import { Avatar, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, Center, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";

const PoolTableRow = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();

  const tokenData = poolData?.baseToken;
  const symbol = tokenData?.symbol ?? "";
  const collateralList = poolData?.assetConfigs;

  const { totalPoolData, error } = useTotalPoolData(poolData);
  let sumCollateralBalances = 0;
  for( let key in totalPoolData?.totalCollateralBalances){
    sumCollateralBalances += totalPoolData.totalCollateralBalances[key];
  }
  
  const isMobile = useIsMobile();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

  return (
    <>
      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        pt={4}
        pb={2}
        backgroundColor={"gray.900"}
        className="hover-row"
        as="button"
        style={{ pointerEvents: address ? "auto" : "none" }}
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="40%"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            width="100%"
          >
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width="25%"
                pl={6}
              >
                <Avatar
                  bg="#FFF"
                  boxSize="30px"
                  name={symbol}
                  src={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                />
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                overflow="scroll"
                width="73%"
              >
                {collateralList?.map((asset, index) => {
                  return (
                    <Avatar
                      bg="#FFF"
                      boxSize="30px"
                      mr={1}
                      name={asset?.symbol ?? ""}
                      src={
                        asset?.logoURL ??
                        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                      }
                    />
                  );
                })}
              </Row>
            </Row>
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
              mt={1}
            >
              <Text fontWeight="bold" pl={1}>
                {symbol} {"Pool"}
              </Text>
            </Row>
          </Column>
        </Row>
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          height="100%"
          width={isMobile ? "33%" : "20%"}
        >
          <Text textAlign="center" fontWeight="bold">
            {totalPoolData?.totalBaseSupplyBalance}
          </Text>
        </Row>
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          height="100%"
          width={isMobile ? "33%" : "20%"}
        >
          <Text textAlign="center" fontWeight="bold">
            {totalPoolData?.totalBaseBorrowBalance}
          </Text>
        </Row>
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          height="100%"
          width={isMobile ? "33%" : "20%"}
        >
          <Text textAlign="center" fontWeight="bold">
            {sumCollateralBalances}
          </Text>
        </Row>
      </Row>
      <ModalDivider />
    </>
  );
};

PoolTableRow.displayName = "PoolTableRow";

export default PoolTableRow;

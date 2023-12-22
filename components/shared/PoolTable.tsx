import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, Center, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import DashboardBox from "components/shared/DashboardBox";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import PoolTableRow from "components/shared/PoolTableRow";
import PoolTableRowTest from "components/shared/PoolTableRowTest";
import { usePoolAllTotalDataContext } from "hooks/pool/usePoolAllTotalDataContext";

const PoolTable = ({ poolData }: { poolData: PoolConfig[] | undefined }) => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();

  const { address } = useAccount();
  const { reload } = useReload();

  const { baseCollateralAssetAndTotalPoolData } = usePoolAllTotalDataContext();

  useEffect(() => {
    reload();
  }, [address]);

  return (
    <>
      {isMobile ? (
        <DashboardBox
          width="100%"
          height="100%"
          mt={4}
          p={4}
          fontSize="lm"
          fontWeight="bold"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            pb={1}
          >
            <Heading size="md" px={4} py={3}>
              {t("Pool Lists")}
            </Heading>
            <ModalDivider />
            {/* {poolData?.map((data, index) => {
              return <PoolTableRow poolData={data} key={index} />;
            })} */}
            {baseCollateralAssetAndTotalPoolData?.map((data, index) => {
              if (data.baseToken) {
                return <PoolTableRowTest poolData={data} key={index} />;
              }
            })}
          </Column>
        </DashboardBox>
      ) : (
        <DashboardBox
          width="100%"
          height="100%"
          mt={4}
          p={4}
          fontSize="lm"
          fontWeight="bold"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            height="100%"
            pb={1}
          >
            <Heading size="md" px={4} py={3}>
              {t("Pool Lists")}
            </Heading>
            <ModalDivider />
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="100%"
              height="50px"
              px={4}
              my={4}
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "10%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Pool Name")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width="30%"
              >
                <Text width="40%" fontWeight="bold" pl={1}>
                  {t("Base Asset")}
                </Text>
                <Text width="60%" fontWeight="bold" pl={1}>
                  {t("Collateral Asset")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Supply Balance")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Borrow Balance")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="center"
                crossAxisAlignment="center"
                height="100%"
                width={isMobile ? "33%" : "20%"}
              >
                <Text textAlign="center" fontWeight="bold">
                  {t("Total Collateral Balance")}
                </Text>
              </Row>
            </Row>
            <ModalDivider />
            {/* {poolData?.map((data, index) => {
              return <PoolTableRow poolData={data} key={index} />;
            })} */}
            {baseCollateralAssetAndTotalPoolData?.map((data, index) => {
              if (data.baseToken) {
                return <PoolTableRowTest poolData={data} key={index} />;
              }
            })}
            <ModalDivider />
          </Column>
        </DashboardBox>
      )}
    </>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

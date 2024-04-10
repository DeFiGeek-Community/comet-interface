import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import PoolTableRow from "components/list/PoolTableRow";
import { useAppData } from "context/AppDataContext";

function RenderPoolTableRow() {
  const { config: poolsConfig } = useAppData();
  if (!poolsConfig) return;

  return Object.values(poolsConfig).map((data, index) => {
    if (data.baseToken) return <PoolTableRow poolData={data} key={index} />;
  });
}

interface TableHeaderColumnProps {
  text: string;
  width: string;
}

const TableHeaderColumn: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
}) => (
  <Row
    mainAxisAlignment="center"
    crossAxisAlignment="center"
    height="100%"
    width={width}
  >
    <Text textAlign="center" fontWeight="bold" width="100%">
      {text}
    </Text>
  </Row>
);

const PoolTable = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <>
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
          {isMobile ? (
            <RenderPoolTableRow />
          ) : (
            <>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                height="50px"
                px={4}
                my={4}
              >
                <TableHeaderColumn text={t("Pool Name")} width="10%" />
                <Row
                  mainAxisAlignment="center"
                  crossAxisAlignment="center"
                  height="100%"
                  width="30%"
                >
                  <TableHeaderColumn text={t("Base Asset")} width="40%" />
                  <TableHeaderColumn text={t("Collateral Asset")} width="60%" />
                </Row>
                <TableHeaderColumn
                  text={t("Total Supply Balance")}
                  width="20%"
                />
                <TableHeaderColumn
                  text={t("Total Borrow Balance")}
                  width="20%"
                />
                <TableHeaderColumn
                  text={t("Total Collateral Balance")}
                  width="20%"
                />
              </Row>
              <ModalDivider />
              <RenderPoolTableRow />
              <ModalDivider />
            </>
          )}
        </Column>
      </DashboardBox>
    </>
  );
};

PoolTable.displayName = "PoolTable";

export default PoolTable;

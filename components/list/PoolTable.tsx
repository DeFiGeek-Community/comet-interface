import React from "react";
import { Heading } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import RenderPoolTableRow from "components/list/RenderPoolTableRow";
import {
  TableHeaderColumn,
  TableHeaderColumnBase,
} from "components/list/TableHeaderColumn";
import { OneHundred } from "constants/aprs";

const PoolTable = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const utilizationFormula =
    t("Borrow") + " / " + t("Supply") + " × " + OneHundred;
  const netEarnAPRFormula = t("Supply APR") + " + " + t("PND Bonus APR");
  const netBorrowAPRFormula = t("Borrow APR") + " - " + t("PND Reward APR");

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
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="flex-start"
                  height="100%"
                  width="16%"
                >
                  <TableHeaderColumnBase text={t("Base Asset")} width="100%" />
                </Row>
                <TableHeaderColumn
                  text={t("Utilization")}
                  width="12%"
                  hovertext={utilizationFormula}
                />
                <TableHeaderColumn
                  text={t("Net Earn APR")}
                  width="12%"
                  hovertext={netEarnAPRFormula}
                />
                <TableHeaderColumn
                  text={t("Net Borrow APR")}
                  width="12%"
                  hovertext={netBorrowAPRFormula}
                />
                <TableHeaderColumn
                  text={t("Total Supply Balance")}
                  width="12%"
                />
                <TableHeaderColumn
                  text={t("Total Borrow Balance")}
                  width="12%"
                />
                <TableHeaderColumn
                  text={t("Total Collateral Balance")}
                  width="12%"
                />
                <Row
                  mainAxisAlignment="center"
                  crossAxisAlignment="center"
                  height="100%"
                  width="12%"
                >
                  <TableHeaderColumn
                    text={t("Collateral Asset")}
                    width="100%"
                  />
                </Row>
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

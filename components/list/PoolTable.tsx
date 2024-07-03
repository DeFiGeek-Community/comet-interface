import React, { useState } from "react";
import { Heading, Text, Box } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "components/shared/DashboardBox";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import PoolTableRow from "components/list/PoolTableRow";
import { useAppData } from "context/AppDataContext";
import { PoolDataProvider } from "components/Provider/PoolDataProvider";
import RenderPoolTableRow from "components/list/RenderPoolTableRow";

// const RenderPoolTableRow = () => {
//   const { config: poolsConfig } = useAppData();
//   if (!poolsConfig) return;

//   return Object.values(poolsConfig).map((data, index) => {
//     if (data.baseToken) {
//       return (
//         <PoolDataProvider poolData={data} key={index}>
//           <PoolTableRow poolData={data} key={index} />
//         </PoolDataProvider>
//       );
//     }
//   });
// }

interface TableHeaderColumnProps {
  text: string;
  width: string;
  hovertext?: string;
}

const TableHeaderColumnBase: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
}) => (
  <Row
    mainAxisAlignment="center"
    crossAxisAlignment="center"
    height="100%"
    width={width}
  >
    <Text textAlign="left" fontWeight="bold" width="100%" pl={3}>
      {text}
    </Text>
  </Row>
);

const TableHeaderColumn: React.FC<TableHeaderColumnProps> = ({
  text,
  width,
  hovertext,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Row
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      height="100%"
      width={width}
    >
      <Text textAlign="center" fontWeight="bold" width="100%">
        {text}
      </Text>
      {hovertext && isHovered && (
        <Box
          position="absolute"
          bg="gray.700"
          p={2}
          mt={-20}
          boxShadow="md"
          borderRadius="md"
          zIndex="tooltip"
        >
          {hovertext}
        </Box>
      )}
    </Row>
  );
};

const PoolTable = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const utilizationFormula = t("Borrow") + " / " + t("Supply") + " × 100";
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

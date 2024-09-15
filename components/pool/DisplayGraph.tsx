import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";

const DisplayGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const renderGraphSection = (
    title: string,
    GraphComponent: React.FC<{ poolData: PoolConfig }>,
  ) => (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      width={isMobile ? "100%" : "50%"}
      height="100%"
    >
      <Box
        width="100%"
        height="50px"
        pt={isMobile ? 6 : 3}
        pl={5}
        color="white"
      >
        {t(title)}
      </Box>
      <GraphComponent poolData={poolData} />
    </Column>
  );

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <ModalDivider />
      <Heading size="md" px={4} py={3}>
        {t("Detailed Information")}
      </Heading>
      <ModalDivider />
      {isMobile ? (
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
        >
          {renderGraphSection("Intterest APR Model", APRGraph)}
          {renderGraphSection("Reward APR Model", RewardGraph)}
        </Column>
      ) : (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          my={4}
        >
          {renderGraphSection("Intterest APR Model", APRGraph)}
          {renderGraphSection("Reward APR Model", RewardGraph)}
        </Row>
      )}
    </Column>
  );
};

export default DisplayGraph;

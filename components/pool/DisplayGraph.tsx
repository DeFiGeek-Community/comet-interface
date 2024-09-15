import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";
import RenderGraphSection from "components/pool/graph/RenderGraphSection";

const DisplayGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
          <RenderGraphSection
            title="Interest APR Model"
            GraphComponent={APRGraph}
            poolData={poolData} 
          />
          <RenderGraphSection
            title="Reward APR Model"
            GraphComponent={RewardGraph}
            poolData={poolData} 
          />
        </Column>
      ) : (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          my={4}
        >
          <RenderGraphSection
            title="Interest APR Model"
            GraphComponent={APRGraph}
            poolData={poolData} 
          />
          <RenderGraphSection
            title="Reward APR Model"
            GraphComponent={RewardGraph}
            poolData={poolData} 
          />
        </Row>
      )}
    </Column>
  );
};

export default DisplayGraph;

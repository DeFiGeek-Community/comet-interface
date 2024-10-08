import React from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, useIsMobile } from "utils/chakraUtils";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";
import { PoolConfig } from "interfaces/pool";
import { RenderGraphSectionProps } from "interfaces/graph";

const RenderGraphSection = ({
  title,
  GraphComponent,
  poolData,
}: RenderGraphSectionProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
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
};

const RenderGraphSections = (poolData: PoolConfig) => (
  <>
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
  </>
);

export default RenderGraphSections;

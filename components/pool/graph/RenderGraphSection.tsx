import React from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, useIsMobile } from "utils/chakraUtils";
import { PoolConfig } from "interfaces/pool";

const RenderGraphSection = ({
  title,
  GraphComponent,
  poolData,
}: {
  title: string;
  GraphComponent: React.FC<{ poolData: PoolConfig }>;
  poolData: PoolConfig;
}) => {
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

export default RenderGraphSection;

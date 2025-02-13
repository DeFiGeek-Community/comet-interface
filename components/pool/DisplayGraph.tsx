import React from "react";
import {
  Heading,
  SimpleGrid,
  Stat,
  Text,
  Spinner
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import RenderGraphSections from "components/pool/graph/RenderGraphSections";
import useReserves from "hooks/pool/shared/useReserves";

const DisplayGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const { reservesData } = useReserves(poolData);

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

      <SimpleGrid
        columns={isMobile ? 1 : 3}
        spacing={4}
        width="100%"
        p={4}
        ml={4}
      >
        <Stat>
          <Text pl={1} fontWeight="bold" mb={2}>
            {t("Reserves")}
          </Text>
          {reservesData?.formattedReserves ? (
            <Text fontSize="lg">{reservesData?.formattedReserves}</Text>
          ) : (
            <Spinner />
          )}
        </Stat>
      </SimpleGrid>
      <ModalDivider />

      {isMobile ? (
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
        >
          {RenderGraphSections(poolData)}
        </Column>
      ) : (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          my={4}
        >
          {RenderGraphSections(poolData)}
        </Row>
      )}
    </Column>
  );
};

export default DisplayGraph;

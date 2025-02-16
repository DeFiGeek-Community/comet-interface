import React from "react";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import RenderGraphSections from "components/pool/graph/RenderGraphSections";

const DisplayGraph = () => {
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
          {RenderGraphSections()}
        </Column>
      ) : (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          my={4}
        >
          {RenderGraphSections()}
        </Row>
      )}
    </Column>
  );
};

export default DisplayGraph;

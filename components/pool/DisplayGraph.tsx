import React from "react";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";
import RewardGraph2 from "components/pool/graph/RewardGraph2";

const DisplayGraph = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();

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
      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={4}
      >
        {/* <APRGraph poolData={poolData} /> */}
        <RewardGraph poolData={poolData} />
        <RewardGraph2 poolData={poolData} />
      </Row>
      
    </Column>
  );
};

export default DisplayGraph;

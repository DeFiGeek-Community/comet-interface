import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";
import { LightGrayColorCode } from "constants/graph";

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
        my={4}
      >
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="50%"
          height="100%"
        >
          <Box
            width="100%"
            height="50px"
            pt={3}
            pl={5}
            color={LightGrayColorCode}
          >
            {t("Intterest APR Model")}
          </Box>
          <APRGraph poolData={poolData} />
        </Column>
        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="50%"
          height="100%"
        >
          <Box
            width="100%"
            height="50px"
            pt={3}
            pl={5}
            color={LightGrayColorCode}
          >
            {t("Reward APR Model")}
          </Box>
          <RewardGraph poolData={poolData} />
        </Column>
      </Row>
    </Column>
  );
};

export default DisplayGraph;

import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row } from "utils/chakraUtils";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import APRGraph from "components/pool/graph/APRGraph";
import RewardGraph from "components/pool/graph/RewardGraph";
import RewardGraph2 from "components/pool/graph/RewardGraph2";
import RewardGraph3 from "components/pool/graph/RewardGraph3";

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
        pr={5} // 右側のパディングを5に設定
        style={{ borderRadius: "10px 45px 45px 10px", overflow: "hidden" }} // 右側の角も丸くするためにスタイルを変更
      >
          <Box width="100%" height="50px" pt={3} pl={5} color="#949494" backgroundColor={"#590202"}>Intterest APR Model</Box>
          <APRGraph poolData={poolData} />
      </Column>
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="50%"
        height="100%"
        style={{ borderRadius: "10px", overflow: "hidden" }} // 角を丸くするためのスタイルを追加
      >
        <Box width="100%" height="50px" pt={3} pl={5} color="#949494" backgroundColor={"#590202"}>Reward APR Model</Box>
        <RewardGraph3 poolData={poolData} />
        </Column>
        {/* <RewardGraph poolData={poolData} />
        <RewardGraph2 poolData={poolData} /> */}
      </Row>
      
    </Column>
  );
};

export default DisplayGraph;

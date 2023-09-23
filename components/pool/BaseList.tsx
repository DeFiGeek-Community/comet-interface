import React from "react";
import { useTranslation } from "react-i18next";
import { Heading, Text } from "@chakra-ui/react";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import BaseAssetRow from "components/pool/BaseAssetRow";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

const BaseList = ({
  poolData
}: {
  poolData: PoolConfig;
}) => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <Heading size="md" px={4} py={3}>
        {t("Base Asset")}
      </Heading>
      <ModalDivider />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={4}
      >
        <Text width="33%" fontWeight="bold" pl={1}>
          {t("Asset")}
        </Text>

        <Text
          width={isMobile ? "35%" : "33%"}
          fontWeight="bold"
          textAlign="center"
        >
          {t("Supply APR")}
        </Text>

        {!isMobile && (
          <Text width="33%" fontWeight="bold" textAlign="center">
            {t("Your Supply")}
          </Text>
        )}

        <Text
          width={isMobile ? "35%" : "33%"}
          fontWeight="bold"
          textAlign="center"
        >
          {t("Borrow APR")}
        </Text>

        {!isMobile && (
          <>
            <Text width={"33%"} fontWeight="bold" textAlign="center">
              {t("Your Borrow")}
            </Text>
            <Text width={"33%"} fontWeight="bold" textAlign="center">
              {t("Available to Borrow")}
            </Text>
          </>
        )}
      </Row>

      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        expand
        mt={1}
      >
        <BaseAssetRow
          poolData={poolData}
        />
      </Column>
    </Column>
  );
};

export default BaseList;

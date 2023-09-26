import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import CollateralAssetRow from "components/pool/CollateralAssetRow";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";

const CollateralList = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();

  const collateralList = poolData.assetConfigs;

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
        {t("Collateral Asset")}
      </Heading>
      <ModalDivider />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={4}
      >
        <Text width="20%" fontWeight="bold" pl={1}>
          {t("Asset")}
        </Text>
        <Text width="20%" textAlign="center" fontWeight="bold" pl={1}>
          {t("Your Supply")}
        </Text>
        <Text width="20%" textAlign="center" fontWeight="bold" pl={1}>
          {t("Collateral Value")}
        </Text>

        {!isMobile && (
          <>
            <Text width="20%" textAlign="center" fontWeight="bold">
              {t("Collateral Factor")}
            </Text>
            <Text width="20%" textAlign="center" fontWeight="bold">
              {t("Liquidation Factor")}
            </Text>
            <Text width="20%" textAlign="center" fontWeight="bold">
              {t("Liquidation Penalty")}
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
        {collateralList.map((asset, index) => {
          return (
            <CollateralAssetRow poolData={poolData} index={index} key={index} />
          );
        })}
      </Column>
    </Column>
  );
};

export default CollateralList;

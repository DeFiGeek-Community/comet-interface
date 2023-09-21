import React from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Column, Center, Row, useIsMobile } from "utils/chakraUtils";
import { USDPricedFuseAsset } from "utils/fetchFusePoolData";
import AssetCollateralSupplyRow from "components/pool/CollateralAssetRow";
import { ModalDivider } from "components/shared/Modal";

const CollateralList = ({
  assets,
  supplyBalanceUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  supplyBalanceUSD: number;
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();

  const suppliedAssets = assets.filter(
    (asset) => asset.supplyBalanceUSD > 1 && !asset.isBaseToken,
  );

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
        {assets.length > 0 ? (
          <>
            {suppliedAssets.map((asset, index) => {
              return (
                <AssetCollateralSupplyRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={suppliedAssets}
                  index={index}
                  isPaused={asset.isPaused}
                />
              );
            })}

            {suppliedAssets.length > 0 ? <ModalDivider my={2} /> : null}
          </>
        ) : (
          <Center expand my={8}>
            {t("There are no assets in this pool.")}
          </Center>
        )}
      </Column>
    </Column>
  );
};

export default CollateralList;

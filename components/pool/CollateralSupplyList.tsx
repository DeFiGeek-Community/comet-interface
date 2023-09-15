import { Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { Column, Center, Row, useIsMobile } from "../../utils/chakraUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import AssetCollateralSupplyRow from "./CollateralAssetSupplyRow";
import { ModalDivider } from "../shared/Modal";

const CollateralSupplyList = ({
  assets,
  supplyBalanceUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  supplyBalanceUSD: number;
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();

  const suppliedAssets = assets.filter((asset) => asset.supplyBalanceUSD > 1 && !asset.isBaseToken);

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
        {t("Collateral Supply Balance:")} {smallUsdFormatter(supplyBalanceUSD)}
      </Heading>
      <ModalDivider />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        width="100%"
        px={4}
        mt={1}
      >
        <Text width="20%" fontWeight="bold" mt={3} pl={1}>
          {t("Asset")}
        </Text>

        {isMobile ? null : (
          <>
            <Text width="20%" textAlign="center">
              {t("Collateral Factor")}
            </Text>
            <Text width="20%" textAlign="center">
              {t("Liquidation Factor")}
            </Text>
            <Text width="20%" textAlign="center">
              {t("Liquidation Penalty")}
            </Text>
          </>
        )}

        <Text
          width={isMobile ? "40%" : "20%"}
          fontWeight="bold"
          textAlign="end"
          mt={3}
        >
          {t("Balance")}
        </Text>

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

export default CollateralSupplyList;

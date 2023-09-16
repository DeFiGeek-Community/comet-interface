import { Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { Column, Center, Row, useIsMobile } from "../../utils/chakraUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import BaseAssetRow from "./BaseAssetRow";
import { ModalDivider } from "../shared/Modal";

const BaseList = ({
  assets,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();

  const suppliedAssets = assets.filter((asset) => asset.isBaseToken);

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
          <Text 
            width="33%"
            fontWeight="bold"
            textAlign="center"
          >
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
            <Text
            width={"33%"}
            fontWeight="bold"
            textAlign="center"
            >
              {t("Your Borrow")}
            </Text>
            <Text
            width={"33%"}
            fontWeight="bold"
            textAlign="center"
            >
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
        {assets.length > 0 ? (
          <>
            {suppliedAssets.map((asset, index) => {
              return (
                <BaseAssetRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={suppliedAssets}
                  index={index}
                  isPaused={asset.isPaused}
                />
              );
            })}

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

export default BaseList;

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Link,
  Progress,
  Spinner,
  Switch,
  Text,
  useDisclosure,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useIsSmallScreen } from "../../../hooks/useIsSmallScreen";
import { shortUsdFormatter, smallUsdFormatter } from "../../../utils/bigUtils";
import {
  Column,
  Center,
  Row,
  RowOrColumn,
  useIsMobile,
} from "../../../utils/chakraUtils";
import { USDPricedFuseAsset } from "../../../utils/fetchFusePoolData";
import AssetSupplyRow from "./AssetSupplyRow";
import { ModalDivider } from "../../shared/Modal";


const SupplyList = ({
  assets,
  supplyBalanceUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  supplyBalanceUSD: number;
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();

  const suppliedAssets = assets.filter((asset) => asset.supplyBalanceUSD > 1);
  const nonSuppliedAssets = assets.filter(
    (asset) => asset.supplyBalanceUSD < 1
  );

  const isMobile = useIsMobile();

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <Heading size="md" px={4} py={3}>
        {t("Supply Balance:")} {smallUsdFormatter(supplyBalanceUSD)}
      </Heading>
      <ModalDivider />

      {/* {assets.length > 0 ? ( */}
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          mt={4}
        >
          <Text width="27%" fontWeight="bold" pl={1}>
            {t("Asset")}
          </Text>

          {isMobile ? null : (
            <Text width="27%" fontWeight="bold" textAlign="right">
              {t("APY/LTV")}
            </Text>
          )}

          <Text
            width={isMobile ? "40%" : "27%"}
            fontWeight="bold"
            textAlign="right"
          >
            {t("Balance")}
          </Text>

          <Text
            width={isMobile ? "34%" : "20%"}
            fontWeight="bold"
            textAlign="right"
          >
            {t("Collateral")}
          </Text>
        </Row>
      {/* ) : null} */}

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
                <AssetSupplyRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={suppliedAssets}
                  index={index}
                  isPaused={asset.isPaused}
                />
              );
            })}

            {suppliedAssets.length > 0 ? <ModalDivider my={2} /> : null}

            {nonSuppliedAssets.map((asset, index) => {

              return (
                <AssetSupplyRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={nonSuppliedAssets}
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

export default SupplyList;
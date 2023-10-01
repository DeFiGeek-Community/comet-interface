import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import { Column, Center } from "utils/chakraUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssetData from "hooks/pool/indivisual/useCollateralAsset";
import DashboardBox from "components/shared/DashboardBox";
import StatsRow from "components/shared/StatsRow";
import { Mode } from "components/PoolModal";
import { PoolConfig, CollateralAsset } from "interfaces/pool";

export const CollateralStatsColumn = ({
  mode,
  asset,
  poolData,
  amount,
}: {
  mode: Mode;
  asset: CollateralAsset | undefined;
  poolData: PoolConfig;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { collateralAssetData } = useCollateralAssetData(asset);
  const { baseAssetData } = useBaseAssetData(poolData);
  const color = asset?.color;
  const symbol = asset?.symbol;
  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

  return (
    <DashboardBox width="100%" height="190px" mt={4}>
      <Column
        mainAxisAlignment="space-between"
        crossAxisAlignment="flex-start"
        expand
        py={3}
        px={4}
        fontSize="lg"
      >
        {collateralAssetData ? (
          <StatsRow
            label={t("Supply Balance") + ":"}
            value={smallFormatter(collateralAssetData?.yourSupply)}
            secondaryValue={
              isAmountAndSupply
                ? smallFormatter(collateralAssetData?.yourSupply + amount)
                : isAmountAndWithdraw
                ? smallFormatter(collateralAssetData?.yourSupply - amount)
                : undefined
            }
            color={color}
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
        {collateralAssetData ? (
          <StatsRow
            label={t("Available to Borrow") + ":"}
            value={smallUsdFormatter(collateralAssetData.collateralValue)}
            secondaryValue={
              isAmountAndSupply
                ? smallFormatter(collateralAssetData.collateralValue + amount)
                : isAmountAndWithdraw
                ? smallFormatter(collateralAssetData?.collateralValue - amount)
                : undefined
            }
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
        {baseAssetData ? (
          <StatsRow
            label={t("Borrow Balance") + ":"}
            value={smallUsdFormatter(baseAssetData.yourBorrow)}
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
      </Column>
    </DashboardBox>
  );
};

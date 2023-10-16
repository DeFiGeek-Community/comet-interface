import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { toNumber, truncateTo2DecimalPlaces } from "utils/numberUtils";
import { Column, Center } from "utils/chakraUtils";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import DashboardBox from "components/shared/DashboardBox";
import StatsRow from "components/shared/StatsRow";
import { Mode } from "components/PoolModal";
import { CollateralAsset } from "interfaces/pool";

export const CollateralStatsColumn = ({
  mode,
  asset,
  amount,
}: {
  mode: Mode;
  asset: CollateralAsset;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { priceFeedData, baseAssetData, collateralAssetsData } =
    usePoolPrimaryDataContext();

  const collateralAssetData = collateralAssetsData
    ? collateralAssetsData[asset.symbol]
    : undefined;
  const decimals = asset?.decimals;
  const yourSupply = toNumber(collateralAssetData?.yourSupply, decimals);
  const availableToBorrow = toNumber(
    baseAssetData?.availableToBorrow,
    decimals,
  );
  const yourBorrow = toNumber(baseAssetData?.yourBorrow, decimals);
  const color = asset?.color;
  const symbol = asset?.symbol;

  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

  const getSecondaryValue = (baseValue: number) => {
    if (!priceFeedData) return undefined;
    const price = priceFeedData.collateralAssets[asset.symbol] ?? 0;
    return isAmountAndSupply
      ? truncateTo2DecimalPlaces(baseValue + amount * price).toString()
      : isAmountAndWithdraw
      ? truncateTo2DecimalPlaces(baseValue - amount * price).toString()
      : undefined;
  };

  return (
    <DashboardBox width="100%" height="170px" mt={4}>
      <Column
        mainAxisAlignment="space-between"
        crossAxisAlignment="flex-start"
        expand
        py={3}
        px={4}
        fontSize="lg"
      >
        {collateralAssetData && baseAssetData ? (
          <>
            <StatsRow
              label={t("Supply Balance") + ":"}
              value={`${truncateTo2DecimalPlaces(yourSupply)} ${symbol}`}
              secondaryValue={
                isAmountAndSupply
                  ? `${truncateTo2DecimalPlaces(yourSupply + amount)} ${symbol}`
                  : isAmountAndWithdraw
                  ? `${truncateTo2DecimalPlaces(yourSupply - amount)} ${symbol}`
                  : undefined
              }
              color={color}
            />
            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={truncateTo2DecimalPlaces(availableToBorrow).toString()}
              secondaryValue={getSecondaryValue(availableToBorrow)}
            />
            <StatsRow
              label={t("Borrow Balance") + ":"}
              value={truncateTo2DecimalPlaces(yourBorrow).toString()}
            />
          </>
        ) : (
          <Center height="150px">
            <Spinner />
          </Center>
        )}
      </Column>
    </DashboardBox>
  );
};

export default CollateralStatsColumn;

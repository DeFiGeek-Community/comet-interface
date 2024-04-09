import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import {
  toNumber,
  truncateTo2DecimalPlaces,
  nonNegativeNumber,
} from "utils/bigUtils";
import { smallUsdFormatter } from "utils/bigUtils";
import { Column, Center } from "utils/chakraUtils";
import { usePool } from "context/PoolContext";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import { usePoolSecondaryDataContext } from "hooks/pool/usePoolSecondaryDataContext";
import DashboardBox from "components/shared/DashboardBox";
import StatsRow from "components/shared/StatsRow";
import { Mode } from "components/PoolModal";
import { CollateralAsset } from "interfaces/pool";
import { useAppData } from "context/AppDataContext";

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
  const { currency, rate } = useAppData();
  const { poolConfig: poolData } = usePool();
  const { priceFeedData, baseAssetData, collateralAssetsData } =
    usePoolPrimaryDataContext();
  const { positionSummary } = usePoolSecondaryDataContext();

  const collateralAssetData = collateralAssetsData
    ? collateralAssetsData[asset.symbol]
    : undefined;
  const decimals = asset?.decimals;
  const yourSupply = toNumber(collateralAssetData?.yourSupply, decimals);
  const availableToBorrowUSD = nonNegativeNumber(
    positionSummary?.availableToBorrowUSD ?? 0,
  );

  const yourBorrow = toNumber(
    baseAssetData?.yourBorrow,
    poolData?.cometDecimals ?? 0,
  );
  const basePrice = priceFeedData?.baseAsset ?? 0;
  const color = asset?.color;
  const symbol = asset?.symbol;

  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

  const getSecondaryValue = (baseValue: number) => {
    if (!priceFeedData) return undefined;
    const price = priceFeedData.collateralAssets[asset.symbol] ?? 0;
    const borrowCollateral = asset?.borrowCollateralFactor / 100 ?? 0;
    return isAmountAndSupply
      ? smallUsdFormatter(
          baseValue + amount * price * borrowCollateral,
          currency,
          rate || 0,
        )
      : isAmountAndWithdraw
        ? smallUsdFormatter(
            baseValue - amount * price * borrowCollateral,
            currency,
            rate || 0,
          )
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
              value={smallUsdFormatter(
                availableToBorrowUSD,
                currency,
                rate || 0,
              )}
              secondaryValue={getSecondaryValue(availableToBorrowUSD)}
            />
            <StatsRow
              label={t("Borrow Balance") + ":"}
              value={`${smallUsdFormatter(
                yourBorrow * basePrice,
                currency,
                rate || 0,
              )}`}
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

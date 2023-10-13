import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import { Column, Center } from "utils/chakraUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAsset";
import usePriceFeedData from "hooks/pool/shared/usePriceFeed";
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
  asset: CollateralAsset;
  poolData: PoolConfig;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { collateralAssetData } = useCollateralAssetData(asset);
  const { baseAssetData } = useBaseAssetData(poolData);
  const { priceFeedData } = usePriceFeedData(poolData);


  const yourSupply = collateralAssetData?.yourSupply ?? 0;
  const availableToBorrow = baseAssetData?.availableToBorrow ?? 0;
  const yourBorrow = baseAssetData?.yourBorrow ?? 0;
  const color = asset?.color;
  const symbol = asset?.symbol;

  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

  const getSecondaryValue = (baseValue: number) => {
    if (!priceFeedData) return undefined;
    const price = priceFeedData.collateralAssets[asset.symbol] ?? 0;
    return isAmountAndSupply
      ? smallUsdFormatter(baseValue + amount * price)
      : isAmountAndWithdraw
      ? smallUsdFormatter(baseValue - amount * price)
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
              value={`${smallFormatter(
                yourSupply,
              )} ${symbol}`}
              secondaryValue={
                isAmountAndSupply
                  ? `${smallFormatter(
                      yourSupply + amount,
                    )} ${symbol}`
                  : isAmountAndWithdraw
                  ? `${smallFormatter(
                      yourSupply - amount,
                    )} ${symbol}`
                  : undefined
              }
              color={color}
            />
            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={smallUsdFormatter(availableToBorrow)}
              secondaryValue={getSecondaryValue(
                availableToBorrow,
              )}
            />
            <StatsRow
              label={t("Borrow Balance") + ":"}
              value={smallUsdFormatter(yourBorrow)}
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

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

  const color = asset?.color;
  const symbol = asset?.symbol;

  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

  const getSecondaryValue = (baseValue: number) => {
    if (!priceFeedData) return undefined;
    const price = priceFeedData.collateralAssets[asset.symbol];
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
                collateralAssetData.yourSupply,
              )} ${symbol}`}
              secondaryValue={
                isAmountAndSupply
                  ? `${smallFormatter(
                      collateralAssetData?.yourSupply + amount,
                    )} ${symbol}`
                  : isAmountAndWithdraw
                  ? `${smallFormatter(
                      collateralAssetData?.yourSupply - amount,
                    )} ${symbol}`
                  : undefined
              }
              color={color}
            />
            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={smallUsdFormatter(baseAssetData.availableToBorrow)}
              secondaryValue={getSecondaryValue(
                baseAssetData.availableToBorrow,
              )}
            />
            <StatsRow
              label={t("Borrow Balance") + ":"}
              value={smallUsdFormatter(baseAssetData.yourBorrow)}
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

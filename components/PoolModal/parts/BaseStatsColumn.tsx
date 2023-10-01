import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import { Column, Center } from "utils/chakraUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAsset";
import DashboardBox from "components/shared/DashboardBox";
import StatsRow from "components/shared/StatsRow";
import { Mode } from "components/PoolModal";
import { PoolConfig, BaseAsset } from "interfaces/pool";

export const BaseStatsColumn = ({
  mode,
  asset,
  poolData,
  amount,
}: {
  mode: Mode;
  asset: BaseAsset | undefined;
  poolData: PoolConfig;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { baseAssetData } = useBaseAssetData(poolData);
  const isAmountAndSupply = mode === Mode.BASE_SUPPLY && Boolean(amount);
  const isAmountAndBorrow = mode === Mode.BASE_BORROW && Boolean(amount);
  const color = asset?.color;
  const symbol = asset?.symbol;

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
        {baseAssetData ? (
          <>
            <StatsRow
              label={
                mode === Mode.BASE_SUPPLY
                  ? t("Supply Balance") + ":"
                  : mode === Mode.BASE_BORROW
                  ? t("Borrow Balance") + ":"
                  : ""
              }
              value={
                mode === Mode.BASE_SUPPLY
                  ? smallFormatter(baseAssetData?.yourSupply)
                  : mode === Mode.BASE_BORROW
                  ? smallFormatter(baseAssetData?.yourBorrow)
                  : ""
              }
              secondaryValue={
                isAmountAndSupply
                  ? smallFormatter(baseAssetData?.yourSupply + amount)
                  : isAmountAndBorrow
                  ? smallFormatter(baseAssetData?.yourBorrow + amount)
                  : undefined
              }
              color={color}
            />

            <StatsRow
              label={
                mode === Mode.BASE_SUPPLY
                  ? t("Supply APR")
                  : mode === Mode.BASE_BORROW
                  ? t("Borrow APR")
                  : ""
              }
              value={
                mode === Mode.BASE_SUPPLY
                  ? `${baseAssetData.supplyAPR} %`
                  : mode === Mode.BASE_BORROW
                  ? `${baseAssetData.borrowAPR} %`
                  : ""
              }
              fontSize="lg"
            />

            <StatsRow
              label={
                mode === Mode.BASE_SUPPLY
                  ? t("Borrow Balance") + ":"
                  : mode === Mode.BASE_BORROW
                  ? t("Supply Balance") + ":"
                  : ""
              }
              value={
                mode === Mode.BASE_SUPPLY
                  ? smallFormatter(baseAssetData?.yourBorrow)
                  : mode === Mode.BASE_BORROW
                  ? smallFormatter(baseAssetData?.yourSupply)
                  : ""
              }
            />

            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={smallUsdFormatter(baseAssetData.availableToBorrow)}
            />
          </>
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
      </Column>
    </DashboardBox>
  );
};

import React from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@chakra-ui/react";
import { smallFormatter } from "utils/bigUtils";
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
  asset: BaseAsset;
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
                  ? `${smallFormatter(baseAssetData?.yourSupply)} ${symbol}`
                  : mode === Mode.BASE_BORROW
                  ? `${smallFormatter(baseAssetData?.yourBorrow)} ${symbol}`
                  : ""
              }
              secondaryValue={
                isAmountAndSupply
                  ? `${smallFormatter(
                      baseAssetData?.yourSupply + amount,
                    )} ${symbol}`
                  : isAmountAndBorrow
                  ? `${smallFormatter(
                      baseAssetData?.yourBorrow + amount,
                    )} ${symbol}`
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
                  ? `${smallFormatter(baseAssetData?.yourBorrow)} ${symbol}`
                  : mode === Mode.BASE_BORROW
                  ? `${smallFormatter(baseAssetData?.yourSupply)} ${symbol}`
                  : ""
              }
            />

            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={`${smallFormatter(baseAssetData.availableToBorrow)} ${symbol}`}
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

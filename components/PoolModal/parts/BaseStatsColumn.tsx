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
  const color = asset?.color;
  const symbol = asset?.symbol;

  if (!baseAssetData) {
    return (
      <DashboardBox width="100%" height="190px" mt={4}>
        <Center height="150px">
          <Spinner />
        </Center>
      </DashboardBox>
    );
  }

  const supplyBalance = baseAssetData?.yourSupply ?? 0;
  const borrowBalance = baseAssetData.yourBorrow ?? 0;

  let primaryValue1 = 0;
  let secondaryValue1 = 0;
  let primaryValue2 = 0;
  let secondaryValue2 = 0;

  if (mode === Mode.BASE_SUPPLY) {
    primaryValue1 = supplyBalance;
    primaryValue2 = borrowBalance;

    if (supplyBalance > 0 || borrowBalance === 0) {
      secondaryValue1 = supplyBalance + amount;
    } else if (borrowBalance > 0) {
      secondaryValue2 = borrowBalance - amount;
    }
  } else if (mode === Mode.BASE_BORROW) {
    primaryValue1 = borrowBalance;
    primaryValue2 = supplyBalance;

    if (borrowBalance > 0 || supplyBalance === 0) {
      secondaryValue1 = borrowBalance + amount;
    } else if (supplyBalance > 0) {
      secondaryValue2 = supplyBalance - amount;
    }
  }

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
        <StatsRow
          label={
            t(mode === Mode.BASE_SUPPLY ? "Supply Balance" : "Borrow Balance") +
            ":"
          }
          value={`${smallFormatter(primaryValue1)} ${symbol}`}
          secondaryValue={
            amount && primaryValue1 !== secondaryValue1
              ? `${smallFormatter(secondaryValue1)} ${symbol}`
              : 0
          }
          color={color}
        />
        <StatsRow
          label={t(mode === Mode.BASE_SUPPLY ? "Supply APR" : "Borrow APR")}
          value={`${
            mode === Mode.BASE_SUPPLY
              ? baseAssetData.supplyAPR
              : baseAssetData.borrowAPR
          } %`}
        />
        <StatsRow
          label={
            t(mode === Mode.BASE_SUPPLY ? "Borrow Balance" : "Supply Balance") +
            ":"
          }
          value={`${smallFormatter(primaryValue2)} ${symbol}`}
          secondaryValue={
            amount && primaryValue2 !== secondaryValue2
              ? `${smallFormatter(secondaryValue2)} ${symbol}`
              : 0
          }
          color={color}
        />
        <StatsRow
          label={t("Available to Borrow") + ":"}
          value={`${smallFormatter(
            baseAssetData.availableToBorrow ?? 0,
          )} ${symbol}`}
        />
      </Column>
    </DashboardBox>
  );
};

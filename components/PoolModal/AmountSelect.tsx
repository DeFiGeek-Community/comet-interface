import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { Heading, Box, Button, Text, Image } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useBalance, useAccount } from "wagmi";
import { Row, Column, useIsMobile } from "utils/chakraUtils";
import useBaseAssetData from "hooks/pool/indivisual/useBaseAsset";
import useCollateralAssetData from "hooks/pool/indivisual/useCollateralAsset";
import DashboardBox from "components/shared/DashboardBox";
import { ModalDivider } from "components/shared/Modal";
import { Mode } from "components/PoolModal";
import {
  AmountInput,
  BaseStatsColumn,
  CollateralStatsColumn,
  TabBar,
  TokenNameAndMaxButton,
} from "components/PoolModal/parts";
import { PoolConfig, BaseAsset, CollateralAsset } from "interfaces/pool";

enum UserAction {
  NO_ACTION,
  WAITING_FOR_TRANSACTIONS,
  VIEWING_QUOTE,
}

const AmountSelect = ({
  mode,
  setMode,
  poolData,
  baseAsset,
  collateralAsset,
  onClose,
}: {
  mode: Mode;
  setMode: (mode: Mode) => any;
  poolData: PoolConfig;
  baseAsset: BaseAsset;
  collateralAsset: CollateralAsset;
  onClose: () => any;
}) => {
  const [userEnteredAmount, _setUserEnteredAmount] = useState("");

  const [amount, _setAmount] = useState<BigNumber | null>(
    () => new BigNumber(0),
  );

  const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

  const { t } = useTranslation();

  const isBase = mode === Mode.BASE_SUPPLY || mode === Mode.BASE_BORROW;
  const asset = isBase ? baseAsset : collateralAsset;

  const { address } = useAccount();
  const { baseAssetData } = useBaseAssetData(poolData);
  const { collateralAssetData } = useCollateralAssetData(collateralAsset);

  const { data: tokenBalance } = useBalance({
    address,
    token: asset?.address,
    cacheTime: 60_000,
    enabled: Boolean(asset?.address),
  });

  const baseSupplyBalance = baseAssetData?.yourSupply ?? 0;
  const baseBorrowBalance = baseAssetData?.yourBorrow ?? 0;
  const baseAvailableToBorrow = baseAssetData?.availableToBorrow ?? 0;

  let maxValue;

  switch (mode) {
    case Mode.BASE_SUPPLY:
      maxValue =
        baseSupplyBalance > 0 || baseBorrowBalance === 0
          ? Number(tokenBalance?.formatted)
          : baseBorrowBalance;
      break;
    case Mode.BASE_BORROW:
      const maxBorrow =
        Number(tokenBalance?.formatted) > baseAvailableToBorrow
          ? baseAvailableToBorrow
          : Number(tokenBalance?.formatted);
      maxValue =
        baseBorrowBalance > 0 || baseSupplyBalance === 0
          ? maxBorrow
          : baseSupplyBalance;
      break;
    case Mode.SUPPLY:
      maxValue = Number(tokenBalance?.formatted);
      break;
    case Mode.WITHDRAW:
      maxValue = Number(collateralAssetData?.yourSupply);
      break;
    default:
      break;
  }

  const updateAmount = (newAmount: string) => {
    if (newAmount.startsWith("-")) {
      return;
    }

    _setUserEnteredAmount(newAmount);

    try {
      BigNumber.DEBUG = true;

      const bigAmount = new BigNumber(newAmount);
      _setAmount(bigAmount);
    } catch (e) {
      _setAmount(null);
    }

    setUserAction(UserAction.NO_ACTION);
  };

  const onConfirm = () => {
    setUserAction(UserAction.WAITING_FOR_TRANSACTIONS);
  };

  const amountIsValid = (() => {
    if (amount === null || amount.isZero()) {
      return false;
    } else {
      return true;
    }
  })();

  let depositOrWithdrawAlert = null;

  const isMobile = useIsMobile();

  let depositOrWithdrawAlertFontSize;
  depositOrWithdrawAlertFontSize = !isMobile ? "15px" : "11px";

  return userAction === UserAction.WAITING_FOR_TRANSACTIONS ? (
    <Column expand mainAxisAlignment="center" crossAxisAlignment="center" p={4}>
      <HashLoader size={70} color={asset?.color ?? "#FFF"} loading />
      <Heading mt="30px" textAlign="center" size="md">
        {t("Check your wallet to submit the transaction")}
      </Heading>
      <Text fontSize="sm" mt="15px" textAlign="center">
        {t("Do not close this tab until you have sent the transaction!")}
      </Text>
      <Text fontSize="xs" mt="5px" textAlign="center">
        {t(
          "Do not increase the price of gas more than 1.5x the prefilled amount!",
        )}
      </Text>
    </Column>
  ) : (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      // height={showEnableAsCollateral ? "575px" : "500px"}
      height={"500px"}
    >
      <>
        <Row
          width="100%"
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          p={4}
          height="72px"
          flexShrink={0}
        >
          <Box height="35px" width="35px">
            <Image
              width="100%"
              height="100%"
              borderRadius="50%"
              src={
                asset?.logoURL ??
                "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
              }
              alt=""
            />
          </Box>

          <Heading fontSize="27px" ml={3}>
            {asset?.symbol ?? ""}
          </Heading>
        </Row>

        <ModalDivider />

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          px={4}
          pb={4}
          pt={1}
          height="100%"
        >
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-start"
            width="100%"
          >
            <TabBar
              color={"#FFF"}
              mode={mode}
              setMode={setMode}
              updateAmount={updateAmount}
            />

            <DashboardBox width="100%" height="70px">
              <Row
                p={4}
                mainAxisAlignment="space-between"
                crossAxisAlignment="center"
                expand
              >
                <AmountInput
                  color={"#FFF"}
                  displayAmount={userEnteredAmount}
                  updateAmount={updateAmount}
                  maxValue={maxValue}
                />
                <TokenNameAndMaxButton
                  updateAmount={updateAmount}
                  asset={asset}
                  maxValue={maxValue}
                  isMaxLoading={!Boolean(maxValue)}
                />
              </Row>
            </DashboardBox>
          </Column>

          {isBase ? (
            <BaseStatsColumn
              mode={mode}
              asset={baseAsset}
              poolData={poolData}
              amount={parseInt(amount?.toFixed(0) ?? "0") ?? 0}
            />
          ) : (
            <CollateralStatsColumn
              mode={mode}
              asset={collateralAsset}
              poolData={poolData}
              amount={parseInt(amount?.toFixed(0) ?? "0") ?? 0}
            />
          )}

          <Button
            mt={4}
            fontWeight="bold"
            fontSize={
              depositOrWithdrawAlert ? depositOrWithdrawAlertFontSize : "2xl"
            }
            borderRadius="10px"
            width="100%"
            height="70px"
            bg={"#FFF"}
            color={"#000"}
            // If the size is small, this means the text is large and we don't want the font size scale animation.
            className={
              isMobile ||
              depositOrWithdrawAlertFontSize === "14px" ||
              depositOrWithdrawAlertFontSize === "15px"
                ? "confirm-button-disable-font-size-scale"
                : ""
            }
            _hover={{ transform: "scale(1.02)" }}
            _active={{ transform: "scale(0.95)" }}
            onClick={onConfirm}
            isDisabled={!amountIsValid}
          >
            {depositOrWithdrawAlert ?? t("Confirm")}
          </Button>
        </Column>
      </>
    </Column>
  );
};

export default AmountSelect;

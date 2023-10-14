import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { Heading, Box, Button, Text, Image } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useBalance, useAccount, useContractRead, erc20ABI } from "wagmi";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { parseUnits } from "viem";
import cometAbi from "static/comet.json";
import { Row, Column, useIsMobile } from "utils/chakraUtils";
import { usePoolPrimaryDataContext } from "hooks/usePoolPrimaryDataContext";
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
  const uintMax = 2 ** 255 - 1;
  const [amount, _setAmount] = useState<BigNumber | null>(
    () => new BigNumber(0),
  );

  const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

  const { t } = useTranslation();

  const isBase = mode === Mode.BASE_SUPPLY || mode === Mode.BASE_BORROW;
  const asset = isBase ? baseAsset : collateralAsset;

  const { address } = useAccount();

  const { data: tokenBalance } = useBalance({
    address,
    token: asset?.address,
    cacheTime: 60_000,
    enabled: Boolean(asset?.address) && Boolean(address),
  });
  const { baseAssetData,  collateralAssetsData } = usePoolPrimaryDataContext();

  const collateralAssetData = collateralAssetsData ? collateralAssetsData[asset.symbol] : undefined;

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
      maxValue =
        baseBorrowBalance > 0 || baseSupplyBalance === 0
          ? baseAvailableToBorrow
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

  const { data: allowanceData } = useContractRead({
    address: asset.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address ?? "0x0", poolData.proxy],
    enabled: Boolean(address) && Boolean(amount),
  });

  const onConfirm = async () => {
    setUserAction(UserAction.WAITING_FOR_TRANSACTIONS);
    const functionName =
      Mode.BASE_SUPPLY || Mode.SUPPLY ? "supply" : "withdraw";
    try {
      if (Number(allowanceData ?? 0) <= Number(amount)) {
        const approveConfig = await prepareWriteContract({
          address: asset.address,
          abi: erc20ABI,
          functionName: "approve",
          args: [poolData.proxy, BigInt(uintMax)],
        });
        const { hash: approveHash } = await writeContract(approveConfig);
        const dataAP = await waitForTransaction({ hash: approveHash });
      }
      const config = await prepareWriteContract({
        address: poolData.proxy,
        abi: cometAbi,
        functionName: functionName,
        args: [asset.address, parseUnits(String(amount), asset.decimals)],
      });
      const { hash } = await writeContract(config);
      const data = await waitForTransaction({ hash });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      onClose();
    } catch (err) {
      console.log("ErrorApprove", err);
    }
  };

  function getDecimalPlaces(value: Number) {
    const decimalPart = value.toString().split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  }

  const amountIsValid = (() => {
    if (amount === null || amount.isZero()) {
      return false;
    }
    if (maxValue && Number(amount) > maxValue) {
      return false;
    }
    if (getDecimalPlaces(Number(amount)) > asset.decimals) {
      return false;
    }
    return true;
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
              amount={parseInt(amount?.toFixed(0) ?? "0") ?? 0}
            />
          ) : (
            <CollateralStatsColumn
              mode={mode}
              asset={collateralAsset}
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

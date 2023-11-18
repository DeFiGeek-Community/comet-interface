import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { Heading, Box, Button, Text, Image, Spinner } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useBalance, useAccount, erc20ABI } from "wagmi";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
  readContract,
} from "@wagmi/core";
import { parseUnits, formatUnits } from "viem";
import cometAbi from "static/comet.json";
import { Row, Column, useIsMobile } from "utils/chakraUtils";
import { formatErrorMessage } from "utils/formatErrorMessage";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import { usePoolSecondaryDataContext } from "hooks/pool/usePoolSecondaryDataContext";
import { useReload } from "context/ReloadContext";
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
  ERROR,
  APPROVE_EXECUTING,
  APPROVE_IN_PROGRESS,
}

const AmountSelect = ({
  mode,
  setMode,
  poolData,
  baseAsset,
  collateralAsset,
  onClose,
  userAction,
  setUserAction,
}: {
  mode: Mode;
  setMode: (mode: Mode) => any;
  poolData: PoolConfig;
  baseAsset: BaseAsset;
  collateralAsset: CollateralAsset;
  onClose: () => any;
  userAction: any;
  setUserAction: (userAction: any) => any;
}) => {
  const [userEnteredAmount, _setUserEnteredAmount] = useState("");
  const [amount, _setAmount] = useState<BigNumber | null>(
    () => new BigNumber(0),
  );

  const [isVisibleMaxButton, setIsVisibleMaxButton] = useState(true);
  const [isSupply, setIsSupply] = useState(true);

  const [stateRepayAllButton, setStateRepayAllButton] = useState(false);
  const [stateWithdrawAllButton, setStateWithdrawAllButton] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isOperation, setIsOperation] = useState(false);

  const { t } = useTranslation();

  const UintMax = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  const { reload } = useReload();

  const isBase = mode === Mode.BASE_SUPPLY || mode === Mode.BASE_BORROW;
  const asset = isBase ? baseAsset : collateralAsset;

  const { address } = useAccount();

  const { data: tokenBalance } = useBalance({
    address,
    token: asset?.address,
    cacheTime: 60_000,
    enabled: Boolean(asset?.address) && Boolean(address),
  });
  const { baseAssetData, collateralAssetsData } = usePoolPrimaryDataContext();
  const { positionSummary } = usePoolSecondaryDataContext();
  const collateralAssetData = collateralAssetsData
    ? collateralAssetsData[asset.symbol]
    : undefined;

  const baseSupplyBalance = baseAssetData?.yourSupply ?? 0;
  const baseBorrowBalance = baseAssetData?.yourBorrow ?? 0;
  const baseAvailableToBorrow = positionSummary?.availableToBorrow ?? 0;
  const baseAvailableToBorrowBigint = isNaN(baseAvailableToBorrow)
    ? BigInt(0)
    : parseUnits(baseAvailableToBorrow.toString(), poolData.cometDecimals);

  let maxValue;

  useEffect(() => {
    let shouldShowMaxButton = true;
    let stateSupply = true;
    switch (mode) {
      case Mode.BASE_SUPPLY:
        if(baseSupplyBalance > 0 || baseBorrowBalance === 0){
          maxValue = tokenBalance?.value;
          shouldShowMaxButton = true;
        }
        else{
          shouldShowMaxButton = false;
        }
        stateSupply = true;
        setAllButtonOff();
        break;
      case Mode.BASE_BORROW:
        if(baseBorrowBalance > 0 || baseSupplyBalance === 0){
          maxValue = baseAvailableToBorrowBigint;
          shouldShowMaxButton = true;
        }else{
          shouldShowMaxButton = false;
        }
        stateSupply = false;
        setAllButtonOff();
        break;
      case Mode.SUPPLY:
        maxValue = tokenBalance?.value;
        break;
      case Mode.WITHDRAW:
        maxValue = collateralAssetData?.yourSupply;
        break;
      default:
        break;
    }
    setIsVisibleMaxButton(shouldShowMaxButton);
    setIsSupply(stateSupply);
  }, [mode, baseSupplyBalance, baseBorrowBalance]);

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

  const toggleAllButtons = (state: boolean) => {
    {isSupply?setStateRepayAllButton(state):setStateWithdrawAllButton(state)}
    if(!state) updateAmount("");
  };

  const setAllButtonOff = () => {
    setStateRepayAllButton(false);
    setStateWithdrawAllButton(false);
  };

  const approve = async () => {
    setUserAction(UserAction.APPROVE_EXECUTING);
    const approveConfig = await prepareWriteContract({
      address: asset.address,
      abi: erc20ABI,
      functionName: "approve",
      args: [poolData.proxy, parseUnits(String(amount), asset.decimals)],
    });
    const { hash: approveHash } = await writeContract(approveConfig);
    setUserAction(UserAction.APPROVE_IN_PROGRESS);
    const dataAP = await waitForTransaction({ hash: approveHash });
  };

  const executeFunction = async (functionName: string) => {
    console.log("functionName", functionName);
    setUserAction(UserAction.WAITING_FOR_TRANSACTIONS);
    const config = await prepareWriteContract({
      address: poolData.proxy,
      abi: cometAbi,
      functionName: functionName,
      args: [asset.address, stateRepayAllButton || stateWithdrawAllButton ? BigInt(UintMax) : parseUnits(String(amount), asset.decimals)],
    });
    const { hash } = await writeContract(config);
    const data = await waitForTransaction({ hash });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    reload();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClose();
  };

  const onConfirm = async () => {
    setIsOperation(true);

    let functionName = "";
    switch (mode) {
      case Mode.BASE_SUPPLY:
        functionName = "supply";
        break;
      case Mode.BASE_BORROW:
        functionName = "withdraw";
        break;
      case Mode.SUPPLY:
        functionName = "supply";
        break;
      case Mode.WITHDRAW:
        functionName = "withdraw";
        break;
      default:
        break;
    }

    try {
      const allowanceData = await readContract({
        address: asset.address,
        abi: erc20ABI,
        functionName: "allowance",
        args: [address ?? "0x0", poolData.proxy],
      });
      console.log("allowanceData", allowanceData);
      if (Number(formatUnits(allowanceData, asset.decimals)) < Number(amount) && functionName === "supply") {
        console.log("approve");
        await approve();
      }
      await executeFunction(functionName);
      setUserAction(UserAction.NO_ACTION);
      setIsOperation(false);
    } catch (err) {
      setUserAction(UserAction.ERROR);
      setErrorMessage(formatErrorMessage(err));
    }
  };

  function getDecimalPlaces(value: Number) {
    const decimalPart = value.toString().split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  }

  const amountIsValid = (() => {
    if (amount === null || amount.isZero()) {
      return true;
    }
    // if (maxValue && Number(amount) > maxValue) {
    //   return true;
    // }
    if (getDecimalPlaces(Number(amount)) > asset.decimals) {
      return true;
    }
    return false;
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
    </Column>
  ) : userAction === UserAction.ERROR ? (
    <Column expand mainAxisAlignment="center" crossAxisAlignment="center" p={4}>
      <Image
        src="/exclamation-triangle-fill.svg"
        alt="Error Icon"
        width="50px"
        height="50px"
      />
      <Heading mt="30px" textAlign="center" size="md">
        {t("An error occurred!")}
      </Heading>
      <Text fontSize="sm" mt="15px" textAlign="center" maxWidth="400px">
        {errorMessage}
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
                  disabled={isBase?isSupply?stateRepayAllButton:stateWithdrawAllButton:false}
                />
                <TokenNameAndMaxButton
                  updateAmount={updateAmount}
                  toggleAllButtons={toggleAllButtons}
                  asset={asset}
                  maxValue={maxValue}
                  isMaxLoading={!Boolean(maxValue)}
                  isSupplyMode={isSupply}
                  isRepayOn={stateRepayAllButton}
                  isWithdrawOn={stateWithdrawAllButton}
                  balanceValue={isSupply ? baseBorrowBalance : baseSupplyBalance}
                  isMaxButtonMode={isVisibleMaxButton}
                />
              </Row>
            </DashboardBox>
          </Column>

          {isBase ? (
            <BaseStatsColumn
              mode={mode}
              asset={baseAsset}
              amount={Number(amount)}
            />
          ) : (
            <CollateralStatsColumn
              mode={mode}
              asset={collateralAsset}
              amount={Number(amount)}
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
            isDisabled={stateRepayAllButton || stateWithdrawAllButton ? false : amountIsValid || isOperation}
          >
            {userAction === UserAction.APPROVE_EXECUTING ? (
              t("Execute Approve")
            ) : userAction === UserAction.APPROVE_IN_PROGRESS ? (
              <>
                <Spinner mr={2} />
                {t("Approve underway")}
              </>
            ) : (
              t("Submit")
            )}
          </Button>
        </Column>
      </>
    </Column>
  );
};

export default AmountSelect;

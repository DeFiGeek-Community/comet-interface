import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import {
  Heading,
  Box,
  Button,
  Text,
  Image,
  Input,
  Tab,
  TabList,
  Tabs,
  Spinner,
} from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useBalance, useAccount } from "wagmi";
import { smallUsdFormatter, smallFormatter } from "utils/bigUtils";
import { Row, Column, useIsMobile, Center } from "utils/chakraUtils";
import useBasePoolData from "hooks/pool/indivisual/useBaseAsset";
import useCollateralPoolData from "hooks/pool/indivisual/useCollateralAsset";
import DashboardBox from "components/shared/DashboardBox";
import { ModalDivider } from "components/shared/Modal";
import { Mode } from "components/PoolModal";
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
  baseAsset: BaseAsset | undefined;
  collateralAsset: CollateralAsset | undefined;
  onClose: () => any;
}) => {
  const [userEnteredAmount, _setUserEnteredAmount] = useState("");

  const [amount, _setAmount] = useState<BigNumber | null>(
    () => new BigNumber(0),
  );

  const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

  const { t } = useTranslation();

  const asset = baseAsset ? baseAsset : collateralAsset;

  const isBase = mode === Mode.BASE_SUPPLY || mode === Mode.BASE_BORROW;

  const { basePoolData } = useBasePoolData(poolData);
  const { collateralPoolData } = useCollateralPoolData(collateralAsset);

  const maxWithdraw = isBase
    ? basePoolData?.yourBorrow || basePoolData?.yourSupply
    : collateralPoolData?.yourSupply;

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
            <TabBar color={"#FFF"} mode={mode} setMode={setMode} />

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
                />
                <TokenNameAndMaxButton
                  mode={mode}
                  asset={asset}
                  updateAmount={updateAmount}
                  maxWithdraw={maxWithdraw}
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

const TabBar = ({
  color,
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => any;
  color: string | null | undefined;
}) => {
  const isSupplySide = mode < 2;
  const { t } = useTranslation();

  return (
    <>
      <style>
        {`
            
            .chakra-tabs__tab {
              color: ${color ?? "#FFFFFF"} !important;

              border-bottom-width: 1px;
            }

            .chakra-tabs__tablist {
              border-bottom: 1px solid;
              border-color: #272727;
            }
            
        `}
      </style>
      <Box px={3} width="100%" mt={1} mb="-1px" zIndex={99999}>
        <Tabs
          isFitted
          width="100%"
          align="center"
          index={isSupplySide ? mode : mode - 2}
          onChange={(index: number) => {
            if (isSupplySide) {
              return setMode(index);
            } else {
              return setMode(index + 2);
            }
          }}
        >
          <TabList>
            {isSupplySide ? (
              <>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Supply")}
                </Tab>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Withdraw")}
                </Tab>
              </>
            ) : (
              <>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Supply (Repay)")}
                </Tab>
                <Tab fontWeight="bold" _active={{}} mb="-1px">
                  {t("Withdraw (Borrow)")}
                </Tab>
              </>
            )}
          </TabList>
        </Tabs>
      </Box>
    </>
  );
};

const CollateralStatsColumn = ({
  mode,
  asset,
  poolData,
  amount,
}: {
  mode: Mode;
  asset: CollateralAsset | undefined;
  poolData: PoolConfig;
  amount: number;
}) => {
  const { t } = useTranslation();
  const { collateralPoolData } = useCollateralPoolData(asset);
  const { basePoolData } = useBasePoolData(poolData);
  const color = asset?.color;
  const symbol = asset?.symbol;
  const isAmountAndSupply = mode === Mode.SUPPLY && Boolean(amount);
  const isAmountAndWithdraw = mode === Mode.WITHDRAW && Boolean(amount);

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
        {collateralPoolData ? (
          <StatsRow
            label={t("Supply Balance") + ":"}
            value={smallFormatter(collateralPoolData?.yourSupply)}
            secondaryValue={
              isAmountAndSupply
                ? smallFormatter(
                  collateralPoolData?.yourSupply + amount,
                  )
                : isAmountAndWithdraw 
                ? smallFormatter(
                  collateralPoolData?.yourSupply - amount,
                  )
                  : undefined
            }
            color={color}
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
        {collateralPoolData ? (
          <StatsRow
            label={t("Available to Borrow") + ":"}
            value={smallUsdFormatter(collateralPoolData.collateralValue)}
            secondaryValue={
              isAmountAndSupply
                ? smallFormatter(collateralPoolData.collateralValue + amount)
                : isAmountAndWithdraw 
                ? smallFormatter(
                  collateralPoolData?.collateralValue - amount
                  )
                  : undefined
            }
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}
        {basePoolData ? (
          <StatsRow
            label={t("Borrow Balance") + ":"}
            value={smallUsdFormatter(basePoolData.yourBorrow)}
          />
        ) : (
          <Center height="50px">
            <Spinner />
          </Center>
        )}

      </Column>
    </DashboardBox>
  );
};

const BaseStatsColumn = ({
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
  const { basePoolData } = useBasePoolData(poolData);
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
        {basePoolData ? (
          <>
            <StatsRow
              label={t("Supply Balance") + ":"}
              value={smallFormatter(basePoolData?.yourSupply)}
              secondaryValue={
                isAmountAndSupply
                  ? smallFormatter(
                      basePoolData?.yourSupply + amount,
                    )
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
                  ? `${basePoolData.supplyAPR} %`
                  : mode === Mode.BASE_BORROW
                  ? `${basePoolData.borrowAPR} %`
                  : ""
              }
              fontSize="lg"
            />

            <StatsRow
              label={t("Available to Borrow") + ":"}
              value={smallUsdFormatter(basePoolData.availableToBorrow)}
              secondaryValue={
                isAmountAndBorrow
                  ? smallUsdFormatter(basePoolData.availableToBorrow + amount)
                  : undefined
              }
            />

            <StatsRow
              label={t("Borrow Balance") + ":"}
              value={smallUsdFormatter(basePoolData.availableToBorrow)}
              secondaryValue={
                isAmountAndBorrow
                  ? smallUsdFormatter(basePoolData.availableToBorrow + amount)
                  : undefined
              }
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

const StatsRow = ({
  label,
  value,
  secondaryValue,
  color,
  fontSize = "lg",
}: {
  label: string;
  value: string | number;
  secondaryValue?: string | number;
  color?: string;
  fontSize?: string;
}) => (
  <Row
    mainAxisAlignment="space-between"
    crossAxisAlignment="center"
    width="100%"
    color={color}
  >
    <Text fontWeight="bold" flexShrink={0}>
      {label}
    </Text>
    <Text fontWeight="bold" flexShrink={0} fontSize={fontSize}>
      {value}
      {secondaryValue && (
        <>
          {" → "}
          {secondaryValue}
        </>
      )}
    </Text>
  </Row>
);

const TokenNameAndMaxButton = ({
  updateAmount,
  mode,
  asset,
  maxWithdraw,
}: {
  updateAmount: (newAmount: string) => any;
  mode: Mode;
  asset: BaseAsset | CollateralAsset | undefined;
  maxWithdraw: number | undefined;
}) => {
  const [isMaxLoading, setIsMaxLoading] = useState(false);
  const { address } = useAccount();
  const isBalance = mode == Mode.SUPPLY || mode == Mode.BASE_SUPPLY;
  const { data: tokenBalance, isLoading } = useBalance({
    address,
    token: asset?.address,
    cacheTime: 60_000,
    enabled: isBalance && Boolean(asset?.address),
  });

  const isBalanceLoading = !(isBalance && !isLoading && Boolean(tokenBalance));
  const isWithdrawLoading = !(!isBalance && Boolean(maxWithdraw));
  const { t } = useTranslation();

  const setToMax = async () => {
    setIsMaxLoading(true);
    try {
      const amount =
        isBalance && tokenBalance
          ? tokenBalance.formatted
          : String(maxWithdraw);
      updateAmount(amount);
      setIsMaxLoading(false);
    } catch (e) {
      console.log("TokenNameAndMaxButton_error", e);
    }
  };

  const logoURL =
    asset?.logoURL ??
    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg";

  return (
    <Row
      mainAxisAlignment="flex-start"
      crossAxisAlignment="center"
      flexShrink={0}
    >
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center">
        <Box height="25px" width="25px" mb="2px" mr={2}>
          <Image
            width="100%"
            height="100%"
            borderRadius="50%"
            backgroundImage={`url(/small-white-circle.png)`}
            src={logoURL}
            alt=""
          />
        </Box>
        <Heading fontSize="24px" mr={2} flexShrink={0}>
          {asset?.symbol}
        </Heading>
      </Row>

      <Button
        ml={1}
        height="28px"
        width="58px"
        bg="transparent"
        border="2px"
        borderRadius="8px"
        borderColor="#272727"
        fontSize="sm"
        fontWeight="extrabold"
        color={"#FFF"}
        _hover={{}}
        _active={{}}
        onClick={setToMax}
        isLoading={
          (isBalanceLoading && isBalance) ||
          (isWithdrawLoading && !isBalance) ||
          isMaxLoading
        }
      >
        {t("MAX")}
      </Button>
    </Row>
  );
};

const AmountInput = ({
  displayAmount,
  updateAmount,
  color,
  disabled = false,
}: {
  displayAmount: string;
  updateAmount: (symbol: string) => any;
  color: string;
  disabled?: boolean;
}) => {
  return (
    <Input
      type="number"
      inputMode="decimal"
      fontSize="3xl"
      fontWeight="bold"
      variant="unstyled"
      _placeholder={{ color }}
      placeholder="0.0"
      value={displayAmount}
      color={color}
      onChange={(event) => updateAmount(event.target.value)}
      mr={4}
      disabled={disabled}
    />
  );
};

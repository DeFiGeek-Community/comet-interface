import { useState } from "react";
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
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "../../utils/bigUtils";
import { Row, Column, useIsMobile } from "../../utils/chakraUtils";
import { USDPricedFuseAsset } from "../../utils/fetchFusePoolData";
import { useTokenData } from "../../hooks/useTokenData";
import DashboardBox from "../shared/DashboardBox";
import { ModalDivider } from "../shared/Modal";
import { Mode } from ".";
import SmallWhiteCircle from "../../static/small-white-circle.png";

enum UserAction {
  NO_ACTION,
  WAITING_FOR_TRANSACTIONS,
}

export enum CTokenErrorCodes {
  NO_ERROR,
  UNAUTHORIZED,
  BAD_INPUT,
  COMPTROLLER_REJECTION,
  COMPTROLLER_CALCULATION_ERROR,
  INTEREST_RATE_MODEL_ERROR,
  INVALID_ACCOUNT_PAIR,
  INVALID_CLOSE_AMOUNT_REQUESTED,
  INVALID_COLLATERAL_FACTOR,
  MATH_ERROR,
  MARKET_NOT_FRESH,
  MARKET_NOT_LISTED,
  TOKEN_INSUFFICIENT_ALLOWANCE,
  TOKEN_INSUFFICIENT_BALANCE,
  TOKEN_INSUFFICIENT_CASH,
  TOKEN_TRANSFER_IN_FAILED,
  TOKEN_TRANSFER_OUT_FAILED,
  UTILIZATION_ABOVE_MAX,
}

const AmountSelect = ({
  onClose,
  assets,
  index,
  mode,
  setMode,
  comptrollerAddress,
  isBorrowPaused = false,
}: {
  onClose: () => any;
  assets: USDPricedFuseAsset[];
  index: number;
  mode: Mode;
  setMode: (mode: Mode) => any;
  comptrollerAddress: string;
  isBorrowPaused?: boolean;
}) => {
  const [userEnteredAmount, _setUserEnteredAmount] = useState("");

  const [amount, _setAmount] = useState<BigNumber | null>(
    () => new BigNumber(0),
  );

  const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

  // const showEnableAsCollateral = !asset.membership && mode === Mode.SUPPLY;
  // const [enableAsCollateral, setEnableAsCollateral] = useState(
  //   showEnableAsCollateral
  // );

  const { t } = useTranslation();

  const asset = assets[index];

  const tokenData = useTokenData(asset.underlyingToken);

  const symbol = tokenData?.symbol ? tokenData?.symbol : "";

  const updateAmount = (newAmount: string) => {
    if (newAmount.startsWith("-")) {
      return;
    }

    _setUserEnteredAmount(newAmount);

    try {
      BigNumber.DEBUG = true;

      // Try to set the amount to BigNumber(newAmount):
      const bigAmount = new BigNumber(newAmount);
      _setAmount(bigAmount);
    } catch (e) {
      // If the number was invalid, set the amount to null to disable confirming:
      _setAmount(null);
    }

    setUserAction(UserAction.NO_ACTION);
  };

  let depositOrWithdrawAlert = null;

  // if (mode === Mode.BORROW && isBorrowPaused) {
  //   depositOrWithdrawAlert = t("Borrowing is disabled for this asset.");
  // }
  // else if (amount === null || amount.isZero()) {
  //   if (mode === Mode.SUPPLY) {
  //     depositOrWithdrawAlert = t("Enter a valid amount to supply.");
  //   } else if (mode === Mode.BORROW) {
  //     depositOrWithdrawAlert = t("Enter a valid amount to borrow.");
  //   } else if (mode === Mode.WITHDRAW) {
  //     depositOrWithdrawAlert = t("Enter a valid amount to withdraw.");
  //   } else {
  //     depositOrWithdrawAlert = t("Enter a valid amount to repay.");
  //   }
  // } else if (amountIsValid === undefined) {
  //   depositOrWithdrawAlert = t("Loading your balance of {{token}}...", {
  //     token: asset.underlyingSymbol,
  //   });
  // } else if (!amountIsValid) {
  //   if (mode === Mode.SUPPLY) {
  //     depositOrWithdrawAlert = t("You don't have enough {{token}}!", {
  //       token: asset.underlyingSymbol,
  //     });
  //   } else if (mode === Mode.REPAY) {
  //     depositOrWithdrawAlert = t(
  //       "You don't have enough {{token}} or are over-repaying!",
  //       {
  //         token: asset.underlyingSymbol,
  //       }
  //     );
  //   } else if (mode === Mode.WITHDRAW) {
  //     depositOrWithdrawAlert = t("You cannot withdraw this much!");
  //   } else if (mode === Mode.BORROW) {
  //     depositOrWithdrawAlert = t("You cannot borrow this much!");
  //   }
  // } else {
  //   depositOrWithdrawAlert = null;
  // }

  const isMobile = useIsMobile();

  // const length = depositOrWithdrawAlert?.length ?? 0;
  let depositOrWithdrawAlertFontSize;
  // if (length < 40) {
  //   depositOrWithdrawAlertFontSize = !isMobile ? "xl" : "17px";
  // } else if (length < 50) {
  depositOrWithdrawAlertFontSize = !isMobile ? "15px" : "11px";
  // } else if (length < 60) {
  //   depositOrWithdrawAlertFontSize = !isMobile ? "14px" : "10px";
  // }

  return (
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
                tokenData?.logoURL ??
                "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
              }
              alt=""
            />
          </Box>

          <Heading fontSize="27px" ml={3}>
            {!isMobile && asset.underlyingName.length < 25
              ? asset.underlyingName
              : symbol}
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
                  disabled={mode === Mode.BORROW && isBorrowPaused}
                />
                <TokenNameAndMaxButton
                  comptrollerAddress={comptrollerAddress}
                  mode={mode}
                  symbol={symbol}
                  logoURL={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                  updateAmount={updateAmount}
                />
              </Row>
            </DashboardBox>
          </Column>

          <StatsColumn
            symbol={symbol}
            amount={parseInt(amount?.toFixed(0) ?? "0") ?? 0}
            color={"#FFF"}
            assets={assets}
            index={index}
            mode={mode}
            // enableAsCollateral={enableAsCollateral}
          />

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
            // onClick={onConfirm}
            // isDisabled={!amountIsValid}
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

  // Woohoo okay so there's some pretty weird shit going on in this component.

  // The AmountSelect component gets passed a `mode` param which is a `Mode` enum. The `Mode` enum has 4 values (SUPPLY, WITHDRAW, BORROW, REPAY).
  // The `mode` param is used to determine what text gets rendered and what action to take on clicking the confirm button.

  // As part of our simple design for the modal, we only show 2 mode options in the tab bar at a time.

  // When the modal is triggered it is given a `defaultMode` (starting mode). This is passed in by the component which renders the modal.
  // - If the user starts off in SUPPLY or WITHDRAW, we only want show them the option to switch between SUPPLY and WITHDRAW.
  // - If the user starts off in BORROW or REPAY, we want to only show them the option to switch between BORROW and REPAY.

  // However since the tab list has only has 2 tabs under it. It accepts an `index` parameter which determines which tab to show as "selected". Since we only show 2 tabs, it can either be 0 or 1.
  // This means we can't just pass `mode` to `index` because `mode` could be 2 or 3 (for BORROW or REPAY respectively) which would be invalid.

  // To solve this, if the mode is BORROW or REPAY we pass the index as `mode - 2` which transforms the BORROW mode to 0 and the REPAY mode to 1.

  // However, we also need to do the opposite of that logic in `onChange`:
  // - If a user clicks a tab and the current mode is SUPPLY or WITHDRAW we just pass that index (0 or 1 respectively) to setMode.
  // - But if a user clicks on a tab and the current mode is BORROW or REPAY, we need to add 2 to the index of the tab so it's the right index in the `Mode` enum.
  //   - Otherwise whenver you clicked on a tab it would always set the mode to SUPPLY or BORROW when clicking the left or right button respectively.

  // Does that make sense? Everything I described above is basically a way to get around the tab component's understanding that it only has 2 tabs under it to make it fit into our 4 value enum setup.
  // Still confused? DM me on Twitter (@transmissions11) for help.

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

const StatsColumn = ({
  color,
  mode,
  assets,
  index,
  amount,
  symbol,
} // enableAsCollateral,
: {
  color: string;
  mode: Mode;
  assets: USDPricedFuseAsset[];
  index: number;
  amount: number;
  symbol: string;
  // enableAsCollateral: boolean;
}) => {
  const { t } = useTranslation();

  const isSupplyingOrWithdrawing =
    mode === Mode.SUPPLY || mode === Mode.WITHDRAW;
  const asset = assets[index];
  return (
    <DashboardBox width="100%" height="190px" mt={4}>
      {/* {updatedAsset ? ( */}
      <Column
        mainAxisAlignment="space-between"
        crossAxisAlignment="flex-start"
        expand
        py={3}
        px={4}
        fontSize="lg"
      >
        <Row
          mainAxisAlignment="space-between"
          crossAxisAlignment="center"
          width="100%"
          color={color}
        >
          <Text fontWeight="bold" flexShrink={0}>
            {t("Supply Balance")}:
          </Text>
          <Text
            fontWeight="bold"
            flexShrink={0}
            fontSize={isSupplyingOrWithdrawing ? "sm" : "lg"}
          >
            {smallUsdFormatter(100).replace("$", "")}
            {isSupplyingOrWithdrawing ? (
              <>
                {" → "}
                {smallUsdFormatter(10).replace("$", "")}
              </>
            ) : null}{" "}
            {symbol}
          </Text>
        </Row>

        {asset?.isBaseToken && (
          <Row
            mainAxisAlignment="space-between"
            crossAxisAlignment="center"
            width="100%"
          >
            <Text fontWeight="bold" flexShrink={0}>
              {isSupplyingOrWithdrawing ? t("Supply APY") : t("Borrow APY")}:
            </Text>
            <Text
              fontWeight="bold"
              // fontSize={updatedAPYDiffIsLarge ? "sm" : "lg"}
              fontSize={"sm"}
            >
              100%
            </Text>
          </Row>
        )}

        <Row
          mainAxisAlignment="space-between"
          crossAxisAlignment="center"
          width="100%"
        >
          <Text fontWeight="bold" flexShrink={0}>
            {t("Available to Borrow")}:
          </Text>
          <Text
            fontWeight="bold"
            fontSize={isSupplyingOrWithdrawing ? "sm" : "lg"}
          >
            {smallUsdFormatter(100)}
            {isSupplyingOrWithdrawing ? (
              <>
                {" → "} {smallUsdFormatter(100)}
              </>
            ) : null}{" "}
          </Text>
        </Row>

        <Row
          mainAxisAlignment="space-between"
          crossAxisAlignment="center"
          width="100%"
        >
          <Text fontWeight="bold">{t("Borrow Balance")}:</Text>
          <Text
            fontWeight="bold"
            fontSize={!isSupplyingOrWithdrawing ? "sm" : "lg"}
          >
            {smallUsdFormatter(100)}
          </Text>
        </Row>
      </Column>
      {/* ) : (
        <Center expand>
          <Spinner />
        </Center>
      )} */}
    </DashboardBox>
  );
};

const TokenNameAndMaxButton = ({
  updateAmount,
  logoURL,
  mode,
  symbol,
  comptrollerAddress,
}: {
  logoURL: string;
  symbol: string;
  mode: Mode;
  comptrollerAddress: string;
  updateAmount: (newAmount: string) => any;
}) => {
  const [isMaxLoading, setIsMaxLoading] = useState(false);

  const { t } = useTranslation();

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
            backgroundImage={`url(${SmallWhiteCircle})`}
            src={logoURL}
            alt=""
          />
        </Box>
        <Heading fontSize="24px" mr={2} flexShrink={0}>
          {symbol}
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
        onClick={() => alert("MAX")}
        isLoading={isMaxLoading}
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

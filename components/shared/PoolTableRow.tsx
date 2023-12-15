import React, { useEffect } from "react";
import { Avatar, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Text } from "@chakra-ui/react";
import { Column, Row, Center, useIsMobile } from "utils/chakraUtils";
import { useReload } from "context/ReloadContext";
import { useTranslation } from "react-i18next";
import { ModalDivider } from "components/shared/Modal";
import { PoolConfig } from "interfaces/pool";
import useTotalPoolData from "hooks/pool/shared/useTotalPoolData";
import { smallUsdPriceFormatter } from "utils/bigUtils";
import { usePoolPrimaryDataContext } from "hooks/pool/usePoolPrimaryDataContext";
import { useCurrency } from "context/currencyContext";

const PoolTableRow = ({ poolData }: { poolData: PoolConfig }) => {
  const { t } = useTranslation();

  const tokenData = poolData?.baseToken;
  const symbol = tokenData?.symbol ?? "";
  const collateralList = poolData?.assetConfigs;

  const { totalPoolData, error } = useTotalPoolData(poolData);
  let sumCollateralBalances = 0;
  for (let key in totalPoolData?.totalCollateralBalances) {
    sumCollateralBalances += totalPoolData.totalCollateralBalances[key];
  }

  const { priceFeedData, baseAssetData } = usePoolPrimaryDataContext();
  const assetPrice = priceFeedData ? priceFeedData.baseAsset : null;
  const { currency, rate } = useCurrency();

  const isMobile = useIsMobile();

  const { address } = useAccount();
  const { reload } = useReload();

  useEffect(() => {
    reload();
  }, [address]);

  return (
    <>
      {isMobile ? (
        <>
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="100%"
            px={4}
            pt={4}
            pb={4}
            backgroundColor={"gray.900"}
            className="hover-row"
            as="button"
            style={{ pointerEvents: address ? "auto" : "none" }}
          >
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              height="100%"
              width="100%"
              pb={1}
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={4}
              >
                <img src="/crown.png" height="20px" width="20px"/>
                <Text textAlign="center" fontWeight="bold" size="md" pl={1}>
                  {symbol} {"Pool"}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={4}
              >
                <Text width="40%" textAlign="left" fontWeight="bold" pl={1}>
                  {t("Base Asset")}
                </Text>
                <Text width="60%" textAlign="left" fontWeight="bold" pl={1}>
                  {t("Collateral Asset")}
                </Text>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-start"
                width="100%"
                pb={6}
              >
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  width="40%"
                  pl={7}
                >
                  <Avatar
                    bg="#FFF"
                    boxSize="30px"
                    name={symbol}
                    src={
                      tokenData?.logoURL ??
                      "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                    }
                  />
                </Row>
                <Row
                  mainAxisAlignment="flex-start"
                  crossAxisAlignment="center"
                  overflow="scroll"
                  width="60%"
                >
                  {collateralList?.map((asset, index) => {
                    return (
                      <Avatar
                        key={index}
                        bg="#FFF"
                        boxSize="30px"
                        mr={1}
                        name={asset?.symbol ?? ""}
                        src={
                          asset?.logoURL ??
                          "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                        }
                      />
                    );
                  })}
                </Row>
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={6}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Supply Balance")}
                </Text>

                {totalPoolData?.totalBaseSupplyBalance !== undefined &&
                assetPrice ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdPriceFormatter(
                        totalPoolData?.totalBaseSupplyBalance,
                        assetPrice,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={6}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Borrow Balance")}
                </Text>

                {totalPoolData?.totalBaseBorrowBalance !== undefined &&
                assetPrice ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdPriceFormatter(
                        totalPoolData?.totalBaseBorrowBalance,
                        assetPrice,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                height="100%"
                width="100%"
                pb={1}
              >
                <Text width="135px" textAlign="left" fontWeight="bold" mr={2}>
                  {t("Total Collateral Balance")}
                </Text>

                {sumCollateralBalances !== undefined && assetPrice ? (
                  <>
                    <Text textAlign="left" fontWeight="bold" color={"#FFF"}>
                      {smallUsdPriceFormatter(
                        sumCollateralBalances,
                        assetPrice,
                        currency,
                        rate || 0,
                      )}
                    </Text>
                  </>
                ) : (
                  <Center height="50px">
                    <Spinner />
                  </Center>
                )}
              </Row>
            </Column>
          </Row>
          <ModalDivider />
        </>
      ) : (
        <>
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width="100%"
            px={4}
            pt={4}
            pb={4}
            backgroundColor={"gray.900"}
            className="hover-row"
            as="button"
            style={{ pointerEvents: address ? "auto" : "none" }}
          >
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "10%"}
            >
              <Text textAlign="center" fontWeight="bold" pl={1}>
                {symbol} {"Pool"}
              </Text>
            </Row>
            <Row
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-start"
              width="30%"
            >
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                width="40%"
                pl={7}
              >
                <Avatar
                  bg="#FFF"
                  boxSize="30px"
                  name={symbol}
                  src={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                />
              </Row>
              <Row
                mainAxisAlignment="flex-start"
                crossAxisAlignment="center"
                overflow="scroll"
                width="60%"
              >
                {collateralList?.map((asset, index) => {
                  return (
                    <Avatar
                      key={index}
                      bg="#FFF"
                      boxSize="30px"
                      mr={1}
                      name={asset?.symbol ?? ""}
                      src={
                        asset?.logoURL ??
                        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                      }
                    />
                  );
                })}
              </Row>
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {totalPoolData?.totalBaseSupplyBalance !== undefined &&
              assetPrice ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdPriceFormatter(
                      totalPoolData?.totalBaseSupplyBalance,
                      assetPrice,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {totalPoolData?.totalBaseBorrowBalance !== undefined &&
              assetPrice ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdPriceFormatter(
                      totalPoolData?.totalBaseBorrowBalance,
                      assetPrice,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              height="100%"
              width={isMobile ? "33%" : "20%"}
            >
              {sumCollateralBalances !== undefined && assetPrice ? (
                <>
                  <Text
                    color={"#FFF"}
                    fontWeight="bold"
                    fontSize="17px"
                    textAlign="center"
                  >
                    {smallUsdPriceFormatter(
                      sumCollateralBalances,
                      assetPrice,
                      currency,
                      rate || 0,
                    )}
                  </Text>
                </>
              ) : (
                <Center height="50px">
                  <Spinner />
                </Center>
              )}
            </Row>
          </Row>
          <ModalDivider />
        </>
      )}
    </>
  );
};

PoolTableRow.displayName = "PoolTableRow";

export default PoolTableRow;

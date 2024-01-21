import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { RowOrColumn, Column, Center, Row } from "utils/chakraUtils";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import DashboardBox from "components/shared/DashboardBox";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { PoolConfig } from "interfaces/pool";

const StatsBarTest = ({
  poolData,
  isPoolList,
}: {
  poolData?: PoolConfig;
  isPoolList?: boolean;
}) => {
  const isMobile = useIsSmallScreen();
  const { t } = useTranslation();

  return (
    <RowOrColumn
      width="100%"
      isRow={!isMobile}
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height={isMobile ? "auto" : "170px"}
    >
      <DashboardBox
        width={isMobile ? "100%" : isPoolList ? "100%" : "50%"}
        height={isMobile ? "auto" : "100%"}
      >
        <Column
          expand
          mainAxisAlignment="center"
          crossAxisAlignment={isMobile ? "center" : "flex-start"}
          textAlign={isMobile ? "center" : "left"}
          p={4}
          fontSize="sm"
        >
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            mb="2px"
          >
            {/* Title */}
            <WhitelistedIcon mb={1} />
            {isPoolList ? (
              <Heading size="lg" isTruncated>
                punodwoɔ
              </Heading>
            ) : (
              <Heading size="lg" isTruncated></Heading>
            )}
          </Row>

          {/* Description */}
          <Text>{t("punodwoɔ is a truly open interest rate protocol.")}</Text>
        </Column>
      </DashboardBox>
    </RowOrColumn>
  );
};

export default StatsBarTest;

const StatBox = ({
  children,
  ...others
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const isMobile = useIsSmallScreen();

  return (
    <DashboardBox
      height={isMobile ? "auto" : "100%"}
      mt={isMobile ? 4 : 0}
      ml={isMobile ? 0 : 2}
      {...others}
    >
      <Center expand p={1}>
        {children}
      </Center>
    </DashboardBox>
  );
};

export const WhitelistedIcon = ({ ...boxProps }: { [x: string]: any }) => {
  return (
    <>
      <SimpleTooltip label={"This pool is safe."} placement="bottom-end">
        <CheckCircleIcon boxSize="20px" mr={3} {...boxProps} />
      </SimpleTooltip>
    </>
  );
};

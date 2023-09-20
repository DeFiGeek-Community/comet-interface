import { Heading, Text } from "@chakra-ui/react";
import { RowOrColumn, Column, Center, Row } from "../../utils/chakraUtils";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { FusePoolData } from "../../utils/fetchFusePoolData";
import CaptionedStat from "../shared/CaptionedStat";
import DashboardBox from "../shared/DashboardBox";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { SimpleTooltip } from "../shared/SimpleTooltip";

const StatsBar = ({ data }: { data?: FusePoolData }) => {
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
        width={isMobile ? "100%" : "50%"}
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
            <Heading size="lg" isTruncated>
              {data?.name ?? "Pool"}
            </Heading>
          </Row>

          {/* Description */}
          <Text>
            Fuse is a truly open interest rate protocol. Lend, borrow, and
            create isolated lending pools with extreme flexibility.
          </Text>
        </Column>
      </DashboardBox>

      <RowOrColumn
        isRow={!isMobile}
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        height="100%"
        width={isMobile ? "100%" : "50%"}
      >
        <RowOrColumn
          isRow={false}
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          height="100%"
          width={isMobile ? "100%" : "60%"}
        >
          <StatBox mb={!isMobile && 2} width={isMobile ? "100%" : "98%"}>
            <CaptionedStat
              crossAxisAlignment="center"
              captionFirst={false}
              statSize={isMobile ? "3xl" : "2xl"}
              captionSize="sm"
              stat={"$?"}
              caption={t(`Total ${data?.baseToken} Supply Balance`)}
            />
          </StatBox>
          <StatBox width={isMobile ? "100%" : "98%"}>
            <CaptionedStat
              crossAxisAlignment="center"
              captionFirst={false}
              statSize={isMobile ? "3xl" : "2xl"}
              captionSize="sm"
              stat={"$?"}
              caption={t("Total Collateral Balance")}
            />
          </StatBox>
        </RowOrColumn>


        <RowOrColumn
          isRow={false}
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          height="100%"
          width={isMobile ? "100%" : "60%"}
        >
          <StatBox mb={!isMobile && 2} width={isMobile ? "100%" : "98%"}>
            <CaptionedStat
              crossAxisAlignment="center"
              captionFirst={false}
              statSize={isMobile ? "3xl" : "2xl"}
              captionSize="sm"
              stat={"$?"}
              caption={t(`Total ${data?.baseToken} Borrow Balance`)}
            />
          </StatBox>
          <StatBox width={isMobile ? "100%" : "98%"}>
            <CaptionedStat
              crossAxisAlignment="center"
              captionFirst={false}
              statSize={isMobile ? "3xl" : "2xl"}
              captionSize="sm"
              stat={"$?"}
              caption={t("Available Liquidity")}
            />
          </StatBox>
        </RowOrColumn>
      </RowOrColumn>
    </RowOrColumn>
  );
};

export default StatsBar;

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
      <SimpleTooltip
        label={"This pool is safe."}
        placement="bottom-end"
      >
        <CheckCircleIcon boxSize="20px" mr={3} {...boxProps} />
      </SimpleTooltip>
    </>
  );
};

import { Heading, Text } from "@chakra-ui/react";
import { RowOrColumn, Column, Center, Row } from "../../../utils/chakraUtils";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useIsSmallScreen } from "../../../hooks/useIsSmallScreen";
import { smallUsdFormatter } from "../../../utils/bigUtils";
import CaptionedStat from "../../shared/CaptionedStat";
import DashboardBox from "../../shared/DashboardBox";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { SimpleTooltip } from "../../shared/SimpleTooltip";

const FuseStatsBar = () => {
  const isMobile = useIsSmallScreen();

  const { t } = useTranslation();
  return (
    <RowOrColumn
      width="100%"
      isRow={!isMobile}
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height={isMobile ? "auto" : "125px"}
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
            {/* {!!data ? ( */}
              <WhitelistedIcon  mb={1} />
            {/* ) : null} */}
            <Heading size="lg" isTruncated>
              {"Fuse"}
            </Heading>
          </Row>

          {/* Description */}
          {/* {!!data ? (
            <Text>
              This pool has{" "}
              <span style={{ fontWeight: "bold" }}>
                {smallUsdFormatter(data.totalSuppliedUSD)} supplied{" "}
              </span>{" "}
              across{" "}
              <span style={{ fontWeight: "bold" }}>
                {data.assets.length} assets.
              </span>{" "}
              Fuse is a truly open interest rate protocol. Lend, borrow,
              and create isolated lending pools with extreme flexibility.
            </Text>
          ) : ( */}
            <Text>
              Fuse is a truly open interest rate protocol. Lend, borrow,
              and create isolated lending pools with extreme flexibility.
            </Text>
          {/* )} */}
        </Column>
      </DashboardBox>

      <RowOrColumn
        isRow={!isMobile}
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        height="100%"
        width={isMobile ? "100%" : "50%"}
      >
        {/* {isAuthed &&
        totalBorrowAndSupply &&
        totalBorrowAndSupply.totalSuppliedUSD > 0 ? ( */}
          <>
            <StatBox width={isMobile ? "100%" : "50%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize="3xl"
                captionSize="sm"
                stat={
                  "$?"
                }
                caption={t("Your Supply Balance")}
              />
            </StatBox>

            <StatBox width={isMobile ? "100%" : "50%"}>
              <CaptionedStat
                crossAxisAlignment="center"
                captionFirst={false}
                statSize="3xl"
                captionSize="sm"
                stat={
                  "$?"
                }
                caption={t("Your Borrow Balance")}
              />
            </StatBox>
          </>
        {/* ) : (
          <StatBox width="100%">
            <APYWithRefreshMovingStat
              formatStat={smallUsdFormatter}
              fetchInterval={40000}
              loadingPlaceholder="$?"
              apyInterval={100}
              fetch={() => fetchFuseNumberTVL(rari, fuse)}
              queryKey={"fuseTVL"}
              apy={0.15}
              statSize="3xl"
              captionSize="xs"
              caption={t("Total Value Supplied Across Fuse")}
              crossAxisAlignment="center"
              captionFirst={false}
            />
          </StatBox>
        )}  */}
      </RowOrColumn>
    </RowOrColumn>
  );
};

export default FuseStatsBar;

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
      ml={isMobile ? 0 : 4}
      {...others}
    >
      <Center expand p={4}>
        {children}
      </Center>
    </DashboardBox>
  );
};

export const WhitelistedIcon = ({
  ...boxProps
}: {
  [x: string]: any;
}) => {
  return (
    <>
      <SimpleTooltip
        label={
            "This pool is from a Whitelisted Admin"
        }
        placement="bottom-end"
      >
        {/* {isWhitelisted ? ( */}
          <CheckCircleIcon boxSize="20px" mr={3} {...boxProps} />
        {/* ) : (
          <WarningTwoIcon
            boxSize="20px"
            mr={3}
            color="orange.300"
            {...boxProps}
          />
        )} */}
      </SimpleTooltip>
    </>
  );
};

import { Link } from "@chakra-ui/react";
import {
  RowOrColumn,
  Row,
  Center,
  useWindowSize,
} from "../../utils/chakraUtils";
import { useTranslation } from "react-i18next";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import DashboardBox from "../shared/DashboardBox";

const activeStyle = { bg: "#FFF", color: "#000" };

export function useIsMediumScreen() {
  const { width } = useWindowSize();
  return width ? width < 1150 : 0;
}

const FuseTabBar = () => {
  const isMobile = useIsSmallScreen();

  const { t } = useTranslation();

  return (
    <DashboardBox width="100%" mt={4} height={isMobile ? "auto" : "65px"}>
      <RowOrColumn
        isRow={!isMobile}
        expand
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        p={4}
      >
        <DashboardBox
          {...(activeStyle)}
          ml={isMobile ? 0 : 4}
          mt={isMobile ? 4 : 0}
          height="35px"
        >
          <Link
            href={"#"}
            className="no-underline"
          >
            <Center expand px={2} fontWeight="bold">
              {t("ETH Pool")}
            </Center>
          </Link>
        </DashboardBox>

        <TabLink route="#" text={t("USDC Pool")} />

        {/* <TabLink
          route="/"
          text={t("Unverified Pools")}
        /> */}


      </RowOrColumn>
    </DashboardBox>
  );
};

const TabLink = ({
  route,
  text,
  ...others
}: {
  route: string;
  text: string;
  [key: string]: any;
}) => {
  const isMobile = useIsSmallScreen();

  return (
    <Link
      className="no-underline"
      href={route}
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
      {...others}
    >
      <DashboardBox height="35px">
        <Center expand px={2} fontWeight="bold">
          {text}
        </Center>
      </DashboardBox>
    </Link>
  );
};

const TabExternalLink = ({ route, text }: { route: string; text: string }) => {
  const isMobile = useIsSmallScreen();

  return (
    <Link
      className="no-underline"
      href={route}
      isExternal
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
    >
      <DashboardBox height="35px">
        <Center expand px={2} fontWeight="bold">
          {text}
        </Center>
      </DashboardBox>
    </Link>
  );
};

export default FuseTabBar;

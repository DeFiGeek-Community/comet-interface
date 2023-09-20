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

const TabBar = () => {
  const isMobile = useIsSmallScreen();

  const { t } = useTranslation();

  return (
    <DashboardBox width="100%" mt={4} height={isMobile ? "auto" : "65px"}>
      <RowOrColumn
        isRow={true}
        expand
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        p={4}
      >
        <DashboardBox
          {...(activeStyle)}
          ml={4}
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

        <DashboardBox
          // {...(activeStyle)}
          ml={4}
          height="35px"
        >
          <Link
            href={"#"}
            className="no-underline"
          >
            <Center expand px={2} fontWeight="bold">
              {t("USDC Pool")}
            </Center>
          </Link>
        </DashboardBox>



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

export default TabBar;

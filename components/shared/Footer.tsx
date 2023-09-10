import { Link, Text } from "@chakra-ui/react";
import { Row, Column } from "../../utils/chakraUtils";
import { useTranslation } from "react-i18next";
import CopyrightSpacer from "./CopyrightSpacer";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Column
        mainAxisAlignment="center"
        crossAxisAlignment="center"
        py={3}
        width="100%"
        flexShrink={0}
        mt="auto"
      >
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          mt={4}
          width="100%"
        >
          <Link isExternal href="/">
            <Text color="white" mx={2} textDecoration="underline">
              {t("Docs")}
            </Text>
          </Link>

          <Text color="white">·</Text>

          <Link isExternal href="https://github.com/DeFiGeek-Community/">
            <Text color="white" mx={2} textDecoration="underline">
              {t("Github")}
            </Text>
          </Link>

          <Text color="white">·</Text>

          <Link
            target="_blank"
            href="https://discord.com/invite/FQYXqVBEnh"
          >
            <Text color="white" mx={2} textDecoration="underline">
              {t("Discord")}
            </Text>
          </Link>
        </Row>
        <CopyrightSpacer forceShow />
      </Column>
    </>
  );
};

export default Footer;

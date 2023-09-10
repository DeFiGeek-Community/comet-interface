import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Row } from "../../utils/chakraUtils";
import Logo from "../../static/dfgc-logo.png";

export const Header = () => {
  return (
    <Row
      color="#FFFFFF"
      px={4}
      height="38px"
      my={4}
      mainAxisAlignment="space-between"
      crossAxisAlignment="center"
      overflowX="visible"
      overflowY="visible"
      width="100%"
    >
      <Box boxSize={"37px"} flexShrink={0}>
        <Image width={37} height={37} src={Logo} alt="Logo" />
      </Box>

      <Row
        mx={4}
        expand
        crossAxisAlignment="flex-start"
        mainAxisAlignment="flex-start"
        overflowX="auto"
        overflowY="hidden"
        transform="translate(0px, 7px)"
      >
        <HeaderLink name="Pool" route="#" />
        <HeaderLink name="Document" route="#" />
      </Row>

      <Text>Account</Text>
    </Row>
  );
};

export const HeaderLink = ({
  name,
  route,
}: {
  name: string;
  route: string;
}) => {
  return (
    <Link href={route} whiteSpace="nowrap" className="no-underline">
      <Text mx={4}>{name}</Text>
    </Link>
  );
};

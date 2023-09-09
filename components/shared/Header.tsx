import React from "react";
import {
  Box,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { Row } from "../../utils/chakraUtils";

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
      <Text>Logo</Text>

      <Row
        mx={4}
        expand
        mainAxisAlignment={{ md: "space-around", base: "space-between" }}
        crossAxisAlignment="flex-start"
        overflowX="auto"
        overflowY="hidden"
        transform="translate(0px, 7px)"
      >
        <HeaderLink name="Overview" route="/" />
        <HeaderLink name="Fuse" route="/fuse" />
        <HeaderLink name="Pool2" route="/pool2" />
        <HeaderLink name="Tranches" route="/tranches" />
      </Row>

      <Text>Account</Text>
    </Row>
  );
};

export const HeaderLink = ({ name, route }: { name: string; route: string }) => {
  return (
    <Link href={route} whiteSpace="nowrap" className="no-underline">
      <Text>{name}</Text>
    </Link>
  );
};


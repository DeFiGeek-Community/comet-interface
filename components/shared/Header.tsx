import React from "react";
import Image from "next/image";
import { Box, Link, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Row } from "utils/chakraUtils";
import { useChainPool } from "hooks/useChainPool";

export const Header = () => {
  const { chainId, poolName } = useChainPool();

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
        <Image width={37} height={37} src={"/dfgc-logo.png"} alt="Logo" />
      </Box>

      <Row
        mx={4}
        expand
        crossAxisAlignment="flex-start"
        mainAxisAlignment="flex-start"
        overflowX="auto"
        overflowY="hidden"
        transform="translate(0px, 7px)"
        width="80%"
      >
        <HeaderLink
          name="CJPY Pool"
          route="/"
          isGreyedOut={poolName === "CJPY"}
        />
        <HeaderLink
          name="USDC Pool"
          route="/?pool=USDC"
          isGreyedOut={poolName === "USDC"}
        />
        <HeaderLink name="Document" route="#" />
      </Row>
      <Row expand crossAxisAlignment="flex-end" mainAxisAlignment="flex-end">
        <ConnectButton accountStatus="address" />
      </Row>
    </Row>
  );
};

export const HeaderLink = ({
  name,
  route,
  isGreyedOut = false,
}: {
  name: string;
  route: string;
  isGreyedOut?: boolean;
}) => {
  return (
    <Link
      href={isGreyedOut ? undefined : route}
      whiteSpace="nowrap"
      className="no-underline"
      pointerEvents={isGreyedOut ? "none" : "auto"}
    >
      <Text mx={4} color={isGreyedOut ? "gray.400" : "white"}>
        {name}
      </Text>
    </Link>
  );
};

import React from "react";
import Image from "next/image";
import {
  Box,
  Link,
  Text,
  Select,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  DrawerHeader,
  DrawerFooter,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Row, useIsMobile } from "utils/chakraUtils";
import { usePool } from "context/PoolContext";
import { useTranslation } from "react-i18next";
import { useAppData } from "context/AppDataContext";

const selectStyle = { backgroundColor: "black", color: "white" };

export function LanguageChange() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: any) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box minW="fit-content">
      <Select
        variant="filled"
        defaultValue=""
        onChange={(event) => changeLanguage(event.target.value)}
        style={selectStyle}
      >
        <option style={selectStyle} value="" disabled>
          Language
        </option>
        <option style={selectStyle} value="en">
          English
        </option>
        <option style={selectStyle} value="ja">
          日本語
        </option>
      </Select>
    </Box>
  );
}

interface CurrencySelectProps {
  currency: string;
  toggleCurrency: (newCurrency: string) => void;
}

function CurrencySelect({ currency, toggleCurrency }: CurrencySelectProps) {
  const isMobile = useIsMobile();
  return (
    <Box minW="fit-content" mt={isMobile ? 4 : 0}>
      <Select
        variant="filled"
        value={currency}
        onChange={(event) => toggleCurrency(event.target.value)}
        style={selectStyle}
      >
        <option style={selectStyle} value="USD">
          USD
        </option>
        <option style={selectStyle} value="JPY">
          JPY
        </option>
      </Select>
    </Box>
  );
}

const HeaderList = () => {
  const isMobile = useIsMobile();
  const { poolName, navigateToPageClick } = usePool();
  const { pageName, config } = useAppData();
  const poolNames = config ? Object.keys(config) : [];
  const isListPage = pageName === "list";

  return (
    <>
      <Box boxSize={"37px"} flexShrink={0} m={isMobile ? 4 : 1} pt={1}>
        <Link
          onClick={() => navigateToPageClick()}
          whiteSpace="nowrap"
          className="no-underline"
          fontWeight="bold"
          fontSize={18}
          sx={{
            pointerEvents: isListPage ? "none" : "auto",
            color: isListPage ? "gray.400" : "white",
          }}
        >
          List
        </Link>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="dark"
        >
          Pool
        </MenuButton>
        <MenuList bg={"dark"} borderColor={"gray"}>
          {poolNames.map((name) => (
            <MenuItem bg={"black"} _focus={{ bg: "#282727" }} key={name}>
              <HeaderLink symbol={name} isGreyedOut={poolName == name} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export const Header = () => {
  const isMobile = useIsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { navigateToPageClick } = usePool();
  const { currency, toggleCurrency } = useAppData();

  return (
    <Row
      color="#FFFFFF"
      bg="black"
      px={4}
      height={isMobile ? "70px" : "60px"}
      my={4}
      mainAxisAlignment="space-between"
      crossAxisAlignment="center"
      overflowX="visible"
      overflowY="visible"
      width="100%"
      position="sticky"
      zIndex="2"
      left="0"
      top="0"
    >
      {!isMobile && (
        <Box
          width={"215px"}
          height={"60px"}
          flexShrink={0}
          display="flex"
          alignItems="center"
        >
          <Link
            onClick={() => navigateToPageClick()}
            whiteSpace="nowrap"
            className="no-underline"
            pointerEvents="auto"
          >
            <Image
              width={199}
              height={42}
              src={"/punodwoɔ-logo-285×60.png"}
              alt="Logo"
            />
          </Link>
        </Box>
      )}
      <Row
        mx={isMobile ? 0 : 4}
        expand
        crossAxisAlignment="center"
        mainAxisAlignment="flex-start"
        overflowX="auto"
        overflowY="hidden"
        width="80%"
      >
        {isMobile ? (
          <>
            <Button onClick={onOpen} bg={"#1A1B1F"}>
              <HamburgerIcon color={"#FFF"} />
            </Button>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay>
                <DrawerContent bg={"#1A1B1F"} color={"#FFF"}>
                  <DrawerHeader>
                    <Box flexShrink={0}>
                      <Link
                        onClick={() => navigateToPageClick()}
                        whiteSpace="nowrap"
                        className="no-underline"
                        pointerEvents="auto"
                      >
                        <Image
                          width={199}
                          height={42}
                          src={"/punodwoɔ-logo-285×60.png"}
                          alt="Logo"
                        />
                      </Link>
                    </Box>
                  </DrawerHeader>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <HeaderList />
                  </DrawerBody>
                  <DrawerFooter
                    flexDirection="column"
                    alignItems="flex-start"
                    p={8}
                  >
                    <LanguageChange />
                    <CurrencySelect
                      currency={currency}
                      toggleCurrency={toggleCurrency}
                    />
                  </DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        ) : (
          <HeaderList />
        )}
      </Row>
      {isMobile ? (
        <Box>
          <Row expand crossAxisAlignment="center" mainAxisAlignment="flex-end">
            <ConnectButton
              chainStatus="name"
              showBalance={false}
              accountStatus="address"
            />
          </Row>
        </Box>
      ) : (
        <Row expand crossAxisAlignment="center" mainAxisAlignment="flex-end">
          <LanguageChange />
          <CurrencySelect currency={currency} toggleCurrency={toggleCurrency} />
          <Spacer flex="0.05" />
          <ConnectButton
            chainStatus="name"
            showBalance={false}
            accountStatus="address"
          />
        </Row>
      )}
    </Row>
  );
};

export const HeaderLink = ({
  symbol,
  isGreyedOut = false,
}: {
  symbol: string;
  isGreyedOut?: boolean;
}) => {
  const { navigateToPageClick } = usePool();

  return (
    <Link
      onClick={() => navigateToPageClick(symbol)}
      whiteSpace="nowrap"
      className="no-underline"
      pointerEvents={isGreyedOut ? "none" : "auto"}
    >
      <Text mx={4} color={isGreyedOut ? "gray.400" : "white"}>
        {`${symbol} Pool`}
      </Text>
    </Link>
  );
};

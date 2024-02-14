import React from "react";
import { useRouter } from 'next/router';
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
} from "@chakra-ui/react";
import { POOL_CONFIG_MAP } from "constants/pools";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Row, useIsMobile } from "utils/chakraUtils";
import { useChainPool } from "hooks/useChainPool";
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
  return (
    <Box minW="fit-content">
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

export const Header = () => {
  const isMobile = useIsMobile();
  const { chainId, poolName, setPoolName } = useChainPool();
  const { currency, toggleCurrency } = useAppData();
  const chainConfig = POOL_CONFIG_MAP[chainId];
  const poolNames = chainConfig ? Object.keys(chainConfig) : [];
  return (
    <Row
      color="#FFFFFF"
      px={4}
      height={isMobile ? "100px" : "38px"}
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
        crossAxisAlignment="center"
        mainAxisAlignment="flex-start"
        overflowX="auto"
        overflowY="hidden"
        width="80%"
      >
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
                <HeaderLink
                  name={`${name} Pool`}
                  route={`/?pool=${name}`}
                  isGreyedOut={poolName == name}
                  onClick={() => setPoolName(name)}
                />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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
          <Row expand crossAxisAlignment="center" mainAxisAlignment="flex-end">
            <LanguageChange />
            <Spacer flex="0.05" />{" "}
            <CurrencySelect
              currency={currency}
              toggleCurrency={toggleCurrency}
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
  name,
  route,
  isGreyedOut = false,
  onClick,
}: {
  name: string;
  route: string;
  isGreyedOut?: boolean;
  onClick: () => void;
}) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isGreyedOut) {
      onClick();
      router.push(route, undefined, { shallow: true });
    }
  };

  return (
    <Link
      href={route}
      onClick={handleClick}
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

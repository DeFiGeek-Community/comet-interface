import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "../i18n/configs";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { Center } from "utils/chakraUtils";
import { HashLoader } from "react-spinners";
import { PoolContext } from "context/PoolContext";
import { CustomAvatar } from "components/shared/AvatarComponent";
import { AppDataProvider } from "components/Provider/AppDataProvider";

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `'Avenir Next', ${theme.fonts.body}`,
    heading: `'Avenir Next', ${theme.fonts.heading}`,
  },
};

const { chains, publicClient } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ?? "" }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? "" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "comet",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {

  const [isRendered, setIsRendered] = useState(false);
  const [chainId, setChainId] = useState<number>(1);
  const [poolName, setPoolName] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme()}
            modalSize="compact"
            avatar={CustomAvatar}
          >
            {isRendered && router.isReady ? (
              <AppDataProvider>
                <PoolContext.Provider value={{ chainId, poolName, setChainId, setPoolName }}>
                  <Component {...pageProps} />
                </PoolContext.Provider>
              </AppDataProvider>
            ) : (
              <Center height="100vh">
                <HashLoader color="#FFF" />
              </Center>
            )}
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default MyApp;

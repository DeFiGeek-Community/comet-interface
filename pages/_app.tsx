import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import type { AppProps } from "next/app";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { CacheProvider } from '@chakra-ui/next-js';
import { CustomAvatar } from "../components/shared/AvatarComponent";

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
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? "" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={darkTheme()} modalSize="compact" avatar={CustomAvatar}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default MyApp;

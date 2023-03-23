import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import Home from './pages/Home';
import MainPage from './pages/MainPage';
import ProtectedRoutes from './components/ProtectedRoutes';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: '82qowNhkJBoR8Qt2x-EdvSvPZWTRqW_8' }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        appInfo={{
          appName: 'PayBlock',
        }}
        theme={lightTheme({
          accentColor: '#48bb78',
          accentColorForeground: '#1A202C',
          borderRadius: 'large',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        {/* <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />
              <Text>
                Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
              </Text>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
            </VStack>
          </Grid>
        </Box> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/mainPage" element={<MainPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

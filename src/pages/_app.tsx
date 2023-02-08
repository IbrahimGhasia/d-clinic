import { AppProps } from "next/app";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from "@mantine/core";

import { useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
	[polygonMumbai, polygon],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "d-Clinic",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
		<>
			<Head>
				<title>d-clinic</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							withGlobalStyles
							withNormalizeCSS
							theme={{ colorScheme }}
						>
							<Component {...pageProps} />
						</MantineProvider>
					</ColorSchemeProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}

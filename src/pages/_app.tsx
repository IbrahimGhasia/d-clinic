import { AppProps } from "next/app";
import Head from "next/head";
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://api.studio.thegraph.com/query/33627/d-clinic/v0.0.2",
});

const { chains, provider } = configureChains(
	[polygonMumbai, polygon, goerli],
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
					<ApolloProvider client={client}>
						<ColorSchemeProvider
							colorScheme={colorScheme}
							toggleColorScheme={toggleColorScheme}
						>
							<MantineProvider
								withGlobalStyles
								withNormalizeCSS
								theme={{ colorScheme }}
							>
								<NotificationsProvider>
									<Component {...pageProps} />
								</NotificationsProvider>
							</MantineProvider>
						</ColorSchemeProvider>
					</ApolloProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}

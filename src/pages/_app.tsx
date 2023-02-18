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
import {
	configureChains,
	createClient,
	goerli,
	mainnet,
	WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import {
	HuddleClientProvider,
	getHuddleClient,
} from "@huddle01/huddle01-client";

const huddleClient = getHuddleClient(
	"9975d342827528d97e1fc5268d7ea7d49dd3ace6f2941f1506a797ba4847a1ed"
);

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://api.studio.thegraph.com/query/33627/d-clinic/v0.0.4",
});

const { chains, provider } = configureChains(
	[goerli, mainnet],
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
						<HuddleClientProvider value={huddleClient}>
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
						</HuddleClientProvider>
					</ApolloProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}

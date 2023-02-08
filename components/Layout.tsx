import { AppShell, Navbar, Header } from "@mantine/core";
import React, { ReactNode } from "react";
import { NavbarMinimal } from "./NavbarMinimal";
import SimpleHeader from "./SimpleHeader";

interface Props {
	children?: ReactNode;
}

export function Layout({ children }: Props) {
	return (
		<AppShell
			padding="md"
			navbar={<NavbarMinimal />}
			header={<SimpleHeader />}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{children}
		</AppShell>
	);
}

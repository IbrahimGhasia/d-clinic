import { useState } from "react";
import {
	Navbar,
	Center,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
} from "@mantine/core";
import {
	TablerIcon,
	IconHome2,
	IconGauge,
	IconDeviceDesktopAnalytics,
	IconFingerprint,
	IconCalendarStats,
	IconUser,
	IconSettings,
	IconLogout,
	IconSwitchHorizontal,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	active: {
		"&, &:hover": {
			// backgroundColor: theme.fn.variant({
			// 	variant: "light",
			// 	color: theme.primaryColor,
			// }).background,
			// color: theme.fn.variant({
			// 	variant: "light",
			// 	color: theme.primaryColor,
			// }).color,

			backgroundColor: "#ede0d4",
			color: theme.colorScheme === "dark" ? "#000" : "",
		},
	},
}));

interface NavbarLinkProps {
	icon: TablerIcon;
	label: string;
	active?: boolean;
	onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	const { classes, cx } = useStyles();
	return (
		<Tooltip label={label} position="right" transitionDuration={0}>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.active]: active })}
			>
				<Icon stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
}

const mockdata = [
	{ icon: IconHome2, label: "Home" },
	{ icon: IconGauge, label: "Dashboard" },
	{ icon: IconDeviceDesktopAnalytics, label: "Analytics" },
	{ icon: IconCalendarStats, label: "Releases" },
	{ icon: IconUser, label: "Account" },
	{ icon: IconFingerprint, label: "Security" },
	{ icon: IconSettings, label: "Settings" },
];

export function NavbarMinimal() {
	const [active, setActive] = useState(2);

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	));

	return (
		<Navbar
			height={770}
			width={{ base: 80 }}
			p="md"
			sx={{ borderWidth: 1, borderColor: "#ede0d4" }}
		>
			<Navbar.Section grow mt={50}>
				<Stack justify="center" spacing={0}>
					{links}
				</Stack>
			</Navbar.Section>
		</Navbar>
	);
}

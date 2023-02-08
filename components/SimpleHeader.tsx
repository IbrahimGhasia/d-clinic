import { Center, Group, Header, Title } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const useStyles = createStyles((theme) => ({
	title: {
		cursor: "pointer",
		[theme.fn.smallerThan("md")]: {
			fontSize: theme.fontSizes.xl,
		},
		color: theme.colorScheme === "dark" ? "#e6ccb2" : "#7f5539",
		fontFamily: "Poppins",
		fontSize: 60,
		fontWeight: 900,
	},
	headBackColor: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : "#ddb892",
	},
}));

const SimpleHeader = () => {
	const { classes, theme } = useStyles();

	return (
		<Header
			height={100}
			p="lg"
			sx={{ borderWidth: 1, borderColor: "#ede0d4" }}
			className={classes.headBackColor}
		>
			<Group position={"apart"}>
				<Link href={"/"} style={{ textDecoration: "none" }}>
					<Title order={1} className={classes.title}>
						d-Clinic
					</Title>
				</Link>
				<Group position="left">
					<ConnectButton />
					<ThemeToggle />
				</Group>
			</Group>
		</Header>
	);
};

export default SimpleHeader;

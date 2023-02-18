import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import { GithubIcon } from "@mantine/ds";
import Link from "next/link";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		boxSizing: "border-box",
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
		height: "100vh",
	},

	inner: {
		position: "relative",
		paddingTop: 200,
		paddingBottom: 120,

		[BREAKPOINT]: {
			paddingBottom: 80,
			paddingTop: 80,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 62,
		fontWeight: 900,
		lineHeight: 1.1,
		margin: 0,
		padding: 0,
		color: theme.colorScheme === "dark" ? theme.white : theme.black,

		[BREAKPOINT]: {
			fontSize: 42,
			lineHeight: 1.2,
		},
	},

	description: {
		marginTop: theme.spacing.xl,
		fontSize: 24,

		[BREAKPOINT]: {
			fontSize: 18,
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 2,

		[BREAKPOINT]: {
			marginTop: theme.spacing.xl,
		},
	},

	control: {
		height: 54,
		paddingLeft: 38,
		paddingRight: 38,

		[BREAKPOINT]: {
			height: 54,
			paddingLeft: 18,
			paddingRight: 18,
			flex: 1,
		},
	},
}));

export function Hero() {
	const { classes } = useStyles();

	return (
		<div className={classes.wrapper}>
			<Container size={700} className={classes.inner}>
				<h1 className={classes.title}>
					{" "}
					<Text
						component="span"
						variant="gradient"
						gradient={{ from: "blue", to: "cyan" }}
						inherit
					>
						d-Clinic
					</Text>{" "}
					- A Decentralized Healthcare Platform
				</h1>

				<Text className={classes.description} color="dimmed">
					d-Clinic is a decentralised platform that enables online decentralised
					meetings and transactions between patients and doctors. It offers a
					secure and transparent platform for healthcare professionals to
					communicate with their patients.
				</Text>

				<Group className={classes.controls}>
					<Link href="/home">
						<Button
							size="xl"
							className={classes.control}
							variant="gradient"
							gradient={{ from: "blue", to: "cyan" }}
						>
							Get started
						</Button>
					</Link>

					<Button
						component="a"
						href="https://github.com/mantinedev/mantine"
						size="xl"
						variant="default"
						className={classes.control}
						leftIcon={<GithubIcon size={20} />}
					>
						GitHub
					</Button>
				</Group>
			</Container>
		</div>
	);
}

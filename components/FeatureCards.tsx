import {
	createStyles,
	Badge,
	Group,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	Button,
	Center,
} from "@mantine/core";
import {
	IconGauge,
	IconUser,
	IconCookie,
	IconStethoscope,
	IconArrowRight,
} from "@tabler/icons";
import Link from "next/link";

const mockdata = [
	{
		title: "Sign In as Doctor",
		description:
			"Connect with your patients and manage your clinic with ease. Get started with d-Clinic today.",
		icon: IconStethoscope,
		link: "/doctor",
	},
	{
		title: "Sign In as Patient",
		description:
			"Connect with your doctors and manage your health with ease. Get started with d-Clinic today.",
		icon: IconUser,
		link: "/patient",
	},
];

const useStyles = createStyles((theme) => ({
	title: {
		fontSize: 34,
		fontWeight: 900,
		[theme.fn.smallerThan("sm")]: {
			fontSize: 24,
		},
	},

	description: {
		maxWidth: 600,
		margin: "auto",

		"&::after": {
			content: '""',
			display: "block",
			backgroundColor: theme.fn.primaryColor(),
			width: 45,
			height: 2,
			marginTop: theme.spacing.sm,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},

	card: {
		border: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
		}`,
	},

	cardTitle: {
		"&::after": {
			content: '""',
			display: "block",
			backgroundColor: theme.fn.primaryColor(),
			width: 45,
			height: 2,
			marginTop: theme.spacing.sm,
		},
	},
}));

export function FeatureCards() {
	const { classes, theme } = useStyles();
	const features = mockdata.map((feature) => (
		<Card
			key={feature.title}
			shadow="md"
			radius="md"
			className={classes.card}
			p="xl"
		>
			<feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
			<Text size="lg" weight={500} className={classes.cardTitle} mt="md">
				{feature.title}
			</Text>
			<Text size="sm" color="dimmed" mt="sm">
				{feature.description}
			</Text>
			<Center>
				<Link href={feature.link}>
					<Button variant={"outline"} mt={"xl"} w={120}>
						<IconArrowRight size={30} />
					</Button>
				</Link>
			</Center>
		</Card>
	));
	return (
		<Container size="lg" py="xl" mt={80}>
			<Group position="center">
				<Badge variant="filled" size="lg">
					Decentralized Clinic
				</Badge>
			</Group>

			<Title order={2} className={classes.title} align="center" mt="sm">
				Welcome to d-Clinic
			</Title>

			{/* <Text
				color="dimmed"
				className={classes.description}
				align="center"
				mt="md"
			>
				Every once in a while, you’ll see a Golbat that’s missing some fangs.
				This happens when hunger drives it to try biting a Steel-type Pokémon.
			</Text> */}

			<SimpleGrid
				cols={2}
				spacing="xl"
				mt={50}
				breakpoints={[{ maxWidth: "md", cols: 1 }]}
			>
				{features}
			</SimpleGrid>
		</Container>
	);
}

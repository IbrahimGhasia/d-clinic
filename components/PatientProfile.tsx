import {
	createStyles,
	Avatar,
	Text,
	Group,
	Title,
	Center,
	Paper,
} from "@mantine/core";
import {
	IconFriends,
	IconBrandGoogleFit,
	IconCake,
	IconHome,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	icon: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[3]
				: theme.colors.gray[5],
	},

	name: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

interface UserInfoIconsProps {
	avatar: string;
	name: string;
	age: number;
	gender: string;
	birthDay: string;
	address: string;
}

export function PatientProfile({
	avatar,
	name,
	age,
	gender,
	birthDay,
	address,
}: UserInfoIconsProps) {
	const { classes } = useStyles();
	return (
		<div>
			<Group noWrap align={"center"} mt={"xl"}>
				<Avatar src={avatar} size={200} radius="lg" />
				<div>
					<Title
						sx={{ textTransform: "uppercase" }}
						weight={700}
						color="dimmed"
					>
						{name}
					</Title>

					<Group noWrap spacing={10}>
						<IconFriends stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							{gender}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconBrandGoogleFit
							stroke={1.5}
							size={20}
							className={classes.icon}
						/>
						<Text size="md" color="dimmed">
							{age}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconCake stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							{birthDay}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconHome stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							{address}
						</Text>
					</Group>
				</div>
			</Group>
		</div>
	);
}

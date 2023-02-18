import { createStyles, Avatar, Text, Group, Title } from "@mantine/core";
import {
	IconFriends,
	IconBrandGoogleFit,
	IconCake,
	IconHome,
	IconWallet,
	IconSchool,
	IconCurrencyEthereum,
	IconAlarm,
	IconIdBadge,
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
	doctorId: string;
	walletAddress: string;
	age: number;
	specialization: string;
	fees: string;
	duration: string;
	address: string;
}

export function DoctorProfile({
	avatar,
	name,
	doctorId,
	walletAddress,
	age,
	specialization,
	fees,
	duration,
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
						color="blue"
						underline
					>
						{name}
					</Title>

					<Group noWrap spacing={10}>
						<IconIdBadge stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							ID : {doctorId}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconWallet stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							Wallet Address : {walletAddress}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconSchool stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							Specialization : {specialization}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconBrandGoogleFit
							stroke={1.5}
							size={20}
							className={classes.icon}
						/>
						<Text size="md" color="dimmed">
							Age : {age}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconCurrencyEthereum
							stroke={1.5}
							size={20}
							className={classes.icon}
						/>
						<Text size="md" color="dimmed">
							Consultance Fee : {fees}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconAlarm stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							Money Stream Flow Rate : {duration}
						</Text>
					</Group>

					<Group noWrap spacing={10}>
						<IconHome stroke={1.5} size={20} className={classes.icon} />
						<Text size="md" color="dimmed">
							Doctor Address : {address}
						</Text>
					</Group>
				</div>
			</Group>
		</div>
	);
}

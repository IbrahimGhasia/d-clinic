import {
	Avatar,
	Badge,
	Table,
	Group,
	Text,
	Anchor,
	ScrollArea,
	useMantineTheme,
	Button,
	Modal,
} from "@mantine/core";
import { useState } from "react";

interface UsersTableProps {
	data: {
		avatar: string;
		name: string;
		job: string;
		email: string;
		phone: string;
	}[];
}

const jobColors: Record<string, string> = {
	engineer: "blue",
	manager: "cyan",
	designer: "pink",
};

export function DoctorList({ data }: UsersTableProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const rows = data.map((item) => (
		<tr key={item.name}>
			<td>
				<Group spacing="sm">
					<Avatar size={30} src={item.avatar} radius={30} />
					<Text size="sm" weight={500}>
						{item.name}
					</Text>
				</Group>
			</td>

			<td>
				<Badge
					color={jobColors[item.job.toLowerCase()]}
					variant={theme.colorScheme === "dark" ? "light" : "outline"}
				>
					{item.job}
				</Badge>
			</td>
			<td>
				<Anchor<"a">
					size="sm"
					href="#"
					onClick={(event) => event.preventDefault()}
				>
					{item.email}
				</Anchor>
			</td>
			<td>
				<Text size="sm" color="dimmed">
					{item.phone}
				</Text>
			</td>
			<td>
				<Modal
					opened={opened}
					onClose={() => setOpened(false)}
					title="Introduce yourself!"
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					transition="fade"
					transitionDuration={300}
					transitionTimingFunction="ease"
					centered
				>
					{/* Modal content */}
				</Modal>
				<Button onClick={() => setOpened(true)}>Make Appointment</Button>
			</td>
		</tr>
	));

	return (
		<ScrollArea>
			<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
				<thead>
					<tr>
						<th>Doctor</th>
						<th>Specialization</th>
						<th>Email</th>
						<th>Phone</th>
						<th />
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea>
	);
}

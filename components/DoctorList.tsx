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
	Textarea,
	MultiSelect,
	Title,
	Divider,
	Grid,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
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
	const pastMedHistory = [
		{ value: "diabetes", label: "Diabetes" },
		{ value: "leukemia", label: "Leukemia" },
		{ value: "neumonia", label: "Neumonia" },
		{ value: "seizures", label: "Seizures" },
		{ value: "high blood pressure", label: "High Blood Pressure" },
		{ value: "cataracts", label: "Cataracts" },
		{ value: "anemia", label: "Anemia" },
		{ value: "tubercolosis", label: "Tubercolosis" },
		{ value: "high cholesterol", label: "High Cholesterol" },
		{ value: "asthma", label: "Asthma" },
		{ value: "kidney disease", label: "Kidney Disease" },
		{ value: "jaundice", label: "Jaundice" },
		{ value: "hiv/aids", label: "HIV/AIDS" },
		{ value: "heart problems", label: "Heart Problems" },
		{ value: "kidney stones", label: "Kidney Stones" },
		{ value: "caner", label: "Cancer" },
		{ value: "stomach ulcers", label: "Stomach Ulcers" },
	];

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
					overlayColor={
						theme.colorScheme === "dark"
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					title="Create Appointment"
					overlayOpacity={0.55}
					overlayBlur={3}
					transition="fade"
					transitionDuration={300}
					transitionTimingFunction="ease"
					centered
					size={"xl"}
				>
					<Grid>
						<Grid.Col>
							<Title order={3}>Medical Information</Title>
							<Divider size="sm" my={10} variant={"dashed"} />
						</Grid.Col>
						<Grid.Col>
							<Textarea
								minRows={3}
								placeholder="Breifly describe your current symptoms"
								label="Current Symptoms"
								withAsterisk
								radius="md"
								size="md"
							/>
						</Grid.Col>

						<Grid.Col>
							<MultiSelect
								data={pastMedHistory}
								placeholder="Do you now or have you ever had any of the following?"
								label="Past Medical History"
								withAsterisk
								radius="md"
								size="md"
							/>
						</Grid.Col>

						<Grid.Col>
							<Title order={3} mt={"lg"}>
								Make Appointment
							</Title>
							<Divider size="sm" my={10} variant={"dashed"} />
						</Grid.Col>

						<Grid.Col span={6}>
							<DatePicker
								placeholder="Pick date"
								label="Appointment Date"
								minDate={dayjs(new Date()).toDate()}
								withAsterisk
								radius="md"
								size="md"
								// onChange={(event) => {
								// 	setDepature((event.value = new Date().toJSON().slice(0, 10)));
								// }}
							/>
						</Grid.Col>

						<Grid.Col span={6}>
							<TimeInput
								defaultValue={new Date()}
								label="Appointment time"
								radius="md"
								size="md"
								format="12"
								amLabel="AM"
								pmLabel="PM"
								withAsterisk
								clearable
							/>
						</Grid.Col>
						<Button
							radius="xl"
							color={"green"}
							size="md"
							fullWidth
							my={"lg"}
							mx={150}
							// disabled={form.isValid() ? false : true}
							onClick={() => setOpened(false)}
						>
							SUBMIT
						</Button>
					</Grid>
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

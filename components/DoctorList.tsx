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
	Title,
	Divider,
	Grid,
	TextInput,
	NumberInput,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconX, IconCheck, IconLoader, IconCircleX } from "@tabler/icons";
import { dClinicContractAddress, dClinicAbi } from "../constants";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { useQuery } from "@apollo/client";
import getPatient from "../graphQuery/getPatientQuery";

interface UsersTableProps {
	data1: {
		name: string;
		specialization: string;
		doctorAddress: string;
		doctorId: string;
		consultanceFee: string;
		duration: string;
	}[];
}

export function DoctorList({ data1 }: UsersTableProps) {
	const { isConnected, address } = useAccount();
	const { data: signer } = useSigner();
	const { loading, error, data } = useQuery(getPatient(address));

	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [symptoms, setSymptoms] = useState("");
	const [pastMedicalHistory, setPastMedicalHistory] = useState("");
	const [appointmentDate, setAppointmentDate] = useState("");
	const [appointmenTime, setAppointmenTime] = useState("");
	const [doctorId, setDoctorId] = useState(0);
	const [doctorWalletAddress, setDoctorWalletAddress] = useState("");

	if (loading) {
		return (
			<>
				<Group position="center" mt={"xl"}>
					<IconLoader size={30} color={"orange"} />
					<Text color={"orange"} size={"xl"}>
						Loading ...
					</Text>
				</Group>
			</>
		);
	}

	if (data) {
		if (data.patientCreateds.length === 0) {
			return (
				<>
					<Group position="center" mt={"xl"}>
						<IconCircleX size={30} color={"red"} />
						<Text color={"red"} size={"xl"}>
							Patient Profile Not Found! Create your profile first! Go to edit
							profile page section.
						</Text>
					</Group>
				</>
			);
		}
	}

	const patientId = data.patientCreateds[0].patientId;

	const handleSubmit = async () => {
		if (!isConnected) {
			showNotification({
				id: "hello",
				autoClose: 5000,
				title: "Connect Wallet",
				message: "Please Connect your wallet to register",
				color: "red",
				icon: <IconX />,
				className: "my-notification-class",
				loading: false,
			});
			return;
		}

		showNotification({
			id: "load-data",
			loading: true,
			title: "Posting...",
			message:
				"Please wait while we are posting your content to the blockchain",
			autoClose: false,
			disallowClose: true,
		});
		if (!signer) {
			console.log("No signer found");
			return;
		}
		const contractInstance = new ethers.Contract(
			dClinicContractAddress,
			dClinicAbi,
			signer
		);
		const tx = await contractInstance.createAppointment(
			patientId,
			doctorId,
			doctorWalletAddress,
			symptoms,
			pastMedicalHistory,
			appointmentDate,
			appointmenTime
		);
		console.log(tx.hash);
		console.log("-------------------------------------------");
		const response = await tx.wait();
		console.log("DONE!");
		console.log("response");
		console.log(response);
		console.log("-------------------------------------------");

		updateNotification({
			id: "load-data",
			color: "teal",
			title: "Posted Successfully",
			icon: <IconCheck size={16} />,
			autoClose: 2000,
			message: undefined,
		});
		setOpened(false);
	};

	const rows = data1.map((item) => (
		<tr key={item.name}>
			<td align="center">
				<Text size="sm" weight={500}>
					{item.doctorId}.
				</Text>
			</td>

			<td align="center">
				<Group spacing="sm">
					<Avatar size={20} src={makeBlockie(item.doctorAddress)} radius={30} />
					<Text size="sm" weight={500}>
						{item.name}
					</Text>
				</Group>
			</td>

			<td align="center">
				<Badge
					color={"yellow"}
					variant={theme.colorScheme === "dark" ? "light" : "outline"}
					size={"sm"}
				>
					{item.specialization}
				</Badge>
			</td>

			<td align="center">
				<Text size="sm" weight={500} ml={"xl"}>
					{item.consultanceFee} / {item.duration}
				</Text>
			</td>

			<td align="center">
				<Text size="sm" weight={500} color={"blue"}>
					{item.doctorAddress}
				</Text>
			</td>

			<td align="center">
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

						<Grid.Col span={6}>
							<NumberInput
								description="Enter the Doctor ID of your selected Doctor"
								label="Doctor ID"
								withAsterisk
								radius="md"
								size="md"
								min={0}
								onChange={(e) => {
									if (!e) {
										return;
									}
									setDoctorId(e);
								}}
							/>
						</Grid.Col>

						<Grid.Col span={6}>
							<TextInput
								description="Enter the Doctor Address of your selected Doctor"
								label="Doctor Wallet Address"
								withAsterisk
								radius="md"
								size="md"
								onChange={(e) => setDoctorWalletAddress(e.currentTarget.value)}
							/>
						</Grid.Col>
						<Grid.Col>
							<Textarea
								minRows={3}
								placeholder="Breifly describe your current symptoms"
								label="Current Symptoms"
								withAsterisk
								radius="md"
								size="md"
								onChange={(e) => setSymptoms(e.currentTarget.value)}
							/>
						</Grid.Col>

						<Grid.Col>
							<TextInput
								placeholder="Do you now or have you ever had any diesese (i.e. Diabities etc) ? Mention them here"
								label="Past Medical History"
								withAsterisk
								radius="md"
								size="md"
								onChange={(e) => setPastMedicalHistory(e.currentTarget.value)}
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
								onChange={(event) => {
									if (!event) {
										return;
									}
									setAppointmentDate(event.toJSON().slice(0, 10));
								}}
							/>
						</Grid.Col>

						<Grid.Col span={6}>
							<TimeInput
								label="Appointment time"
								radius="md"
								size="md"
								format="12"
								withAsterisk
								clearable
								onChange={(event) => {
									if (!event) {
										return;
									}
									const hrs = event.getHours();
									const mins = event.getMinutes();
									const time = `${hrs}:${mins}`;
									setAppointmenTime(time);
								}}
							/>
						</Grid.Col>
						<Button
							radius="xl"
							color={"green"}
							size="md"
							fullWidth
							my={"lg"}
							mx={150}
							disabled={
								!symptoms ||
								!pastMedicalHistory ||
								!appointmentDate ||
								!appointmenTime
							}
							onClick={handleSubmit}
						>
							SUBMIT
						</Button>
					</Grid>
				</Modal>
				<Button
					size="xs"
					variant={"outline"}
					color="lime"
					onClick={() => setOpened(true)}
				>
					Make Appointment
				</Button>
			</td>
		</tr>
	));

	return (
		<ScrollArea>
			<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
				<thead>
					<tr>
						<th>
							<Text size={"sm"} align="center">
								Doctor Id
							</Text>
						</th>
						<th>
							<Text size={"sm"} align="center">
								Doctor Name
							</Text>
						</th>
						<th>
							<Text size={"sm"} align="center">
								Specialization
							</Text>
						</th>
						<th>
							<Text size={"sm"} align="center">
								Consultance Fee / Duration
							</Text>
						</th>
						<th>
							<Text size={"sm"} align="center">
								Wallet Address
							</Text>
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea>
	);
}

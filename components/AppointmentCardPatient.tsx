import {
	Badge,
	Button,
	Divider,
	Group,
	Modal,
	Table,
	Text,
	Title,
	UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import getDoctor from "graphQuery/getDoctorQuery";
import { IconBrandZoom, IconInfoSquare, IconStethoscope } from "@tabler/icons";
import useSuperfluid from "../hooks/useSuperFluid";
import { useAccount, useProvider, useSigner } from "wagmi";
import Link from "next/link";

interface TableProps {
	elements: {
		doctorId: string;
		symptoms: string;
		pastMedHistory: string;
		appointmentDate: string;
		appointmentTime: string;
		doctorAddress: string;
		patientAddress: string;
	}[];
}

const AppointmentCardPatient = ({ elements }: TableProps) => {
	const [opened, setOpened] = useState(false);
	const [d_address, setD_address] = useState("");

	const { sendPlanedStream } = useSuperfluid();
	const { data: signer } = useSigner();
	const provider = useProvider();
	const { address } = useAccount();

	const sendStream = async () => {
		await sendPlanedStream(
			provider,
			signer,
			address,
			"0xB287A419Da76167C1d5D154A7FF947cF2e17E46A",
			3600,
			0.001
		);
	};

	// sendStream();

	// const joinMeeting = async (doctorAddress: string) => {
	// 	await huddleClient.join(doctorAddress, {
	// 		address: address,
	// 	});
	// };

	let doctor_name = "",
		doctor_perAddress = "",
		walletAddress = "",
		gender = "",
		age = "",
		consultanceFee = "",
		duration = "",
		specialization = "";

	const { data: doctor_details } = useQuery(getDoctor(d_address));
	if (doctor_details && d_address.length !== 0) {
		console.log(doctor_details);
		doctor_name = doctor_details.doctorCreateds[0].name;
		doctor_perAddress = doctor_details.doctorCreateds[0].d_address;
		walletAddress = doctor_details.doctorCreateds[0].doctorAddress;
		gender = doctor_details.doctorCreateds[0].gender;
		age = doctor_details.doctorCreateds[0].age;
		consultanceFee = doctor_details.doctorCreateds[0].consultanceFee;
		duration = doctor_details.doctorCreateds[0].duration;
		specialization = doctor_details.doctorCreateds[0].specialization;
	}

	const rows = elements.map((element) => (
		<tr key={element.doctorId}>
			<td align="center">{element.doctorId} . </td>
			<td align="left">{element.symptoms}</td>
			<td align="center">{element.pastMedHistory}</td>
			<td align="center">{element.appointmentDate}</td>
			<td align="center">{element.appointmentTime}</td>
			<td align="center">
				<Modal
					opened={opened}
					transition={"fade"}
					centered
					onClose={() => setOpened(false)}
					title="Doctor Details"
					size={"lg"}
				>
					<Group>
						<IconStethoscope size={30} color={"green"} />
						<Title order={2} color={"blue"}>
							{doctor_name}{" "}
							<Badge ml={10} color={"pink"} size={"lg"}>
								{specialization}
							</Badge>
						</Title>
					</Group>

					<Divider size="sm" my={10} variant={"dashed"} />

					<Text fw={500}>
						<span style={{ color: "red" }}>Wallet Address : </span>
						{walletAddress}
					</Text>
					<Text fw={500}>
						<span style={{ color: "red" }}>Doctor Address : </span>
						{doctor_perAddress}
					</Text>
					<Text fw={500}>
						<span style={{ color: "red" }}>
							Flow rate charge (Consultance Fee / Duration) :{" "}
						</span>
						{consultanceFee} ETH / {duration} sec.
					</Text>
				</Modal>

				<UnstyledButton
					onClick={() => {
						setOpened(true);
						setD_address(element.doctorAddress);
					}}
				>
					<IconInfoSquare />
				</UnstyledButton>
			</td>
			<td align="center">
				<Link href="/meetRoom">
					<UnstyledButton>
						<IconBrandZoom />
					</UnstyledButton>
				</Link>
			</td>
		</tr>
	));

	return (
		<Table>
			<thead>
				<tr>
					<th>
						<Text align="center">Doctor ID</Text>
					</th>
					<th>
						<Text align="center">Symptoms</Text>
					</th>
					<th>
						<Text align="center">Past Medical History</Text>
					</th>
					<th>
						<Text align="center">Appointment Date</Text>
					</th>
					<th>
						<Text align="center">Appointment Time</Text>
					</th>
					<th>
						<Text align="center">Doctor Info</Text>
					</th>
					<th>
						<Text align="center">Join the Meeting</Text>
					</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};
export default AppointmentCardPatient;

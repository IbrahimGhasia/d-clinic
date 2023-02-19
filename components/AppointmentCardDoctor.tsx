import {
	Button,
	Divider,
	Group,
	Modal,
	Table,
	Text,
	Textarea,
	Title,
	UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import getPatient from "graphQuery/getPatientQuery";
import getPrescription from "../graphQuery/getPrescriptionQuery";

import { IconBrandZoom, IconInfoSquare, IconUserCircle } from "@tabler/icons";
import Link from "next/link";
import { Chat } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";

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

const AppointmentCardDoctor = ({ elements }: TableProps) => {
	const [opened, setOpened] = useState(false);
	const [p_address, setP_address] = useState("");

	const { address } = useAccount();

	let patient_name = "",
		patient_walletAddress = "",
		patient_perAddress = "",
		age = "",
		dob = "",
		gender = "";

	const { data: patient_details } = useQuery(getPatient(p_address));
	if (patient_details && p_address.length !== 0) {
		console.log(patient_details);
		patient_name = patient_details.patientCreateds[0].name;
		patient_walletAddress = patient_details.patientCreateds[0].patientAddress;
		patient_perAddress = patient_details.patientCreateds[0].p_address;
		age = patient_details.patientCreateds[0].age;
		gender = patient_details.patientCreateds[0].gender;
		dob = patient_details.patientCreateds[0].dob;
	}

	const { data: prescription_details, loading: prescription_loading } =
		useQuery(getPrescription(p_address));

	if (prescription_loading) {
		return;
	}
	let prescription = "";

	if (
		prescription_details.prescriptionAddeds.length === undefined &&
		p_address.length !== 0
	) {
		// console.log(prescription_details);
		prescription = prescription_details.prescriptionAddeds[0].prescriptions;
	}

	const rows = (
		<>
			{elements.map((element) => (
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
							size={"lg"}
							title={"Patient Details"}
						>
							<Group>
								<IconUserCircle size={30} color={"green"} />
								<Title order={2} color={"blue"}>
									{patient_name}{" "}
								</Title>
							</Group>

							<Divider size="sm" my={10} variant={"dashed"} />

							<Text fw={500}>
								<span style={{ color: "red" }}>Wallet Address : </span>
								{patient_walletAddress}
							</Text>
							<Text fw={500}>
								<span style={{ color: "red" }}>Patient Home Address : </span>
								{patient_perAddress}
							</Text>
							<Text fw={500}>
								<span style={{ color: "red" }}>Gender : </span>
								{gender}
							</Text>
							<Text fw={500}>
								<span style={{ color: "red" }}>Age : </span>
								{age}
							</Text>
							<Text fw={500}>
								<span style={{ color: "red" }}>Date Of Birth : </span>
								{dob}
							</Text>
							<Divider size="sm" my={10} variant={"dashed"} />
							<Text fw={500}>
								<span style={{ color: "red" }}>Prescription : </span>
								{prescription.length === 0
									? "No prescription given."
									: prescription}
							</Text>

							<Group position="apart" mt={30}>
								<div>
									<Link href="/meetRoom">
										<Button
											leftIcon={<IconBrandZoom size={18} />}
											color="blue"
											variant="outline"
											size="md"
										>
											Create Meeting
										</Button>
									</Link>
								</div>
							</Group>

							<div>
								{!address ? null : (
									<Chat
										account={address} //user address
										supportAddress={patient_walletAddress} //support address
										apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
										env="staging"
									/>
								)}
							</div>
						</Modal>

						<UnstyledButton
							onClick={() => {
								setOpened(true);
								setP_address(element.patientAddress);
							}}
						>
							<IconInfoSquare />
						</UnstyledButton>
					</td>
				</tr>
			))}
		</>
	);

	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>
							<Text align="center">Patient ID</Text>
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
							<Text align="center">Patient Info</Text>
						</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
};
export default AppointmentCardDoctor;

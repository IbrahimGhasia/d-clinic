import { Divider, Paper, Title, Text, Group } from "@mantine/core";
import { PatientProfile } from "./PatientProfile";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { IconCircleX, IconLoader } from "@tabler/icons";

import getPatient from "../graphQuery/getPatientQuery";

const PatientDashboard = () => {
	const { address } = useAccount();

	const { loading, error, data } = useQuery(getPatient(address));
	console.log(data);

	let p_name = "",
		walletAddress = "",
		age = 0,
		gender = "",
		dob = "",
		perAddress = "",
		patientId = "";

	let patientObject;

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

		p_name = data.patientCreateds[0].name;
		walletAddress = data.patientCreateds[0].patientAddress;
		age = data.patientCreateds[0].age;
		gender = data.patientCreateds[0].gender;
		dob = data.patientCreateds[0].dob;
		perAddress = data.patientCreateds[0].p_address;
		patientId = data.patientCreateds[0].patientId;

		patientObject = (
			<PatientProfile
				avatar={
					"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
				}
				name={p_name}
				walletAddress={walletAddress}
				age={age}
				gender={gender}
				birthDay={dob}
				address={perAddress}
			/>
		);
	}

	return (
		<div>
			<Paper shadow={"xl"} p={"xl"} radius={"xl"} withBorder={true} my={10}>
				<Title>Patient Dashboard</Title>
				<Divider size="sm" my={10} variant={"dashed"} />
				{patientObject}
			</Paper>
		</div>
	);
};
export default PatientDashboard;

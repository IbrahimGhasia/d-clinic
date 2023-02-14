import { Divider, Paper, Title, Text, Group } from "@mantine/core";
import { PatientProfile } from "./PatientProfile";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { IconCircleX, IconLoader, IconZoomExclamation } from "@tabler/icons";

import getPatient from "../graphQuery/getPatientQuery";
import PatientAppoinment from "./PatientAppoinment";

const PatientDashboard = () => {
	const { address } = useAccount();
	const {
		loading,
		error,
		data: patientProfile,
	} = useQuery(getPatient(address));

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

	if (error) {
		return (
			<>
				<Group position="center" mt={"xl"}>
					<IconZoomExclamation size={30} color={"red"} />
					<Text color={"red"} size={"xl"}>
						Opps, something went wrong! Try again ...
					</Text>
				</Group>
			</>
		);
	}

	if (patientProfile) {
		if (patientProfile.patientCreateds.length === 0) {
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

		p_name = patientProfile.patientCreateds[0].name;
		walletAddress = patientProfile.patientCreateds[0].patientAddress;
		age = patientProfile.patientCreateds[0].age;
		gender = patientProfile.patientCreateds[0].gender;
		dob = patientProfile.patientCreateds[0].dob;
		perAddress = patientProfile.patientCreateds[0].p_address;
		patientId = patientProfile.patientCreateds[0].patientId;

		patientObject = (
			<>
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
				<PatientAppoinment patientId={patientId} />
			</>
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

import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import getDoctor from "../graphQuery/getDoctorQuery";

import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import {
	IconCircleX,
	IconError404,
	IconLoader,
	IconZoomExclamation,
} from "@tabler/icons";
import { DoctorProfile } from "./DoctorProfile";
import DoctorAppointmentList from "./DoctorAppointmentList";

const DoctorDashboardPanel = () => {
	const { address } = useAccount();
	const { loading, error, data: doctorProfile } = useQuery(getDoctor(address));

	let name = "",
		doctorId = "",
		walletAddress = "",
		age = 0,
		gender = "",
		specialization = "",
		perAddress = "",
		Consultancefees = "",
		duration = "";

	let doctorObject;

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

	if (doctorProfile) {
		if (doctorProfile.doctorCreateds.length === 0) {
			return (
				<>
					<Group position="center" mt={"xl"}>
						<IconCircleX size={30} color={"red"} />
						<Text color={"red"} size={"xl"}>
							Doctor Profile Not Found! Create your profile first! Go to edit
							profile page section.
						</Text>
					</Group>
				</>
			);
		}
	}

	name = doctorProfile.doctorCreateds[0].name;
	doctorId = doctorProfile.doctorCreateds[0].doctorId;
	walletAddress = doctorProfile.doctorCreateds[0].doctorAddress;
	age = doctorProfile.doctorCreateds[0].age;
	gender = doctorProfile.doctorCreateds[0].gender;
	specialization = doctorProfile.doctorCreateds[0].specialization;
	perAddress = doctorProfile.doctorCreateds[0].d_address;
	Consultancefees = doctorProfile.doctorCreateds[0].consultanceFee;
	duration = doctorProfile.doctorCreateds[0].duration;

	doctorObject = (
		<>
			<DoctorProfile
				avatar={
					"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
				}
				name={name}
				walletAddress={walletAddress}
				age={age}
				specialization={specialization}
				fees={Consultancefees}
				duration={duration}
				address={perAddress}
			/>
		</>
	);

	return (
		<div>
			<Paper shadow={"xl"} p={"xl"} radius={"xl"} withBorder={true} my={10}>
				<Title>Doctor Dashboard</Title>
				<Divider size="sm" my={10} variant={"dashed"} />
				{doctorObject}
				<DoctorAppointmentList />
			</Paper>
		</div>
	);
};

export default DoctorDashboardPanel;

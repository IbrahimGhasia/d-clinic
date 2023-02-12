import { Paper, Title, Text, Divider, Group } from "@mantine/core";
import { SetStateAction, useState } from "react";
import { DoctorList } from "./DoctorList";
import { gql, useQuery } from "@apollo/client";

import getDoctorList from "../graphQuery/getDoctorListQuery";
import { IconLoader } from "@tabler/icons";

const data2 = [
	{
		avatar:
			"https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Robert Wolfkisser",
		job: "Engineer",
		email: "rob_wolf@gmail.com",
		phone: "123-456-7890",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jill Jailbreaker",
		job: "Engineer",
		email: "jj@breaker.com",
		phone: "123-456-7890",
	},
];

const AppointmentPanel = () => {
	const { loading, error, data } = useQuery(getDoctorList());

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
	// data.doctorCreateds.map((doctor: any) => {
	// 	console.log(doctor);
	// });

	// const [currentSymptoms, setCurrentSymptoms] = useState();
	// const [pastMedHistory, setPastMedHistory] = useState([]);
	// const [appointmentDate, setAppointmentDate] = useState(new Date());
	// const [appointmentTime, setAppointmentTime] = useState();

	return (
		<>
			<Paper shadow={"xl"} p={"xl"} radius={"xl"} withBorder={true} my={10}>
				<Title>Create New Appointment</Title>
				<Divider size="sm" my={10} variant={"dashed"} />
				<div>
					<DoctorList data1={data.doctorCreateds} />
				</div>
			</Paper>
		</>
	);
};
export default AppointmentPanel;

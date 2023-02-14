import { Paper, Title, Text, Divider, Group } from "@mantine/core";
import { SetStateAction, useState } from "react";
import { DoctorList } from "./DoctorList";
import { gql, useQuery } from "@apollo/client";

import getDoctorList from "../graphQuery/getDoctorListQuery";
import { IconLoader, IconZoomExclamation } from "@tabler/icons";

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
